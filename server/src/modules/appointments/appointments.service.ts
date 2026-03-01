import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { EstadosCita, Roles } from 'src/common/enums';
import { Persona } from '../users/entities/persona.entity';
import { Administrativo } from '../users/entities/administrativo.entity';
import { Profesional } from '../users/entities/profesional.entity';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';
import { CancelAppointmentDTO } from './dto/cancelAppointment.dto';
import { CustomHttpException } from 'src/common/exceptions/custom-http.exception';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Cita)
        private appointmentRepository: Repository<Cita>,

        @InjectRepository(Persona)
        private personRepository: Repository<Persona>,

        @InjectRepository(Administrativo)
        private adminRepository: Repository<Administrativo>,

        @InjectRepository(Profesional)
        private professionalRepository: Repository<Profesional>,
    ) {}

    /**
     * @description Cada día luego de las 12, cuando la cita esté en estado confirmada pero la fecha venció, cambiará a No asistida
     * @returns Mensaje de cambio de estado de las citas
     */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async updateMissedAppointments() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const citasVencidas = await this.appointmentRepository.find({
            where: {
                estado: EstadosCita.CONFIRMADA,
                fechaCita: LessThan(today)
            }
        });

        if (citasVencidas.length === 0) return;

        for (const cita of citasVencidas) {
            cita.estado = EstadosCita.NOASISTIDA;
        }

        await this.appointmentRepository.save(citasVencidas);
        console.log(`Se actualizaron ${citasVencidas.length} citas a NO_ASISTIDA`);
    }

    // Crear cita - ADMIN
    async adminCreateAppointment(adminFromToken, newAppointment: CreateAppointmentDTO) {

        if (adminFromToken.role == 'profesional' ) {
            throw new CustomHttpException("Sólo los administrativos o pacientes pueden crear citas", HttpStatus.FORBIDDEN);
        }

        const idAdministrativo = adminFromToken.idPersona; 

        const { idPaciente, idProfesional, fechaCita, horaCita, modalidad, motivo, consultorio } = newAppointment;

        // ---------- BUSCAR ENTIDADES ----------
        const paciente = await this.personRepository.findOne({ where: { idPersona: idPaciente } });
        if (!paciente) throw new CustomHttpException('Paciente no encontrado', HttpStatus.NOT_FOUND);

        const profesional = await this.professionalRepository.findOne({
            where: { idProfesional },
            relations: ["persona"]
        });
        if (!profesional) throw new CustomHttpException('Profesional no encontrado', HttpStatus.NOT_FOUND);

        const administrativo = await this.adminRepository.findOne({ where: { idAdministrativo } });
        if (!administrativo) throw new CustomHttpException('Administrativo no encontrado', HttpStatus.NOT_FOUND);

        const [yy, mm, dd] = fechaCita.split('-').map(Number); 
        const citaDate = new Date(yy, mm - 1, dd);


        // ---------- VALIDACIONES ----------
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (citaDate < today) {
            throw new CustomHttpException('La fecha de cita no puede ser anterior a hoy.');
        }

        const now = new Date();

        if (citaDate.getTime() === today.getTime()) {
            const [hour, minute] = horaCita.split(':').map(Number);

            if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
                throw new CustomHttpException('La hora debe ser mayor que la hora actual.');
            }
        }

        // ---------- VALIDAR SI YA TIENE CITA ACTIVA ----------
        const citaActiva = await this.appointmentRepository.findOne({
            where: {
                paciente: { idPersona: idPaciente },
                estado: EstadosCita.CONFIRMADA
            },
            relations: ["paciente"]
        });

        if (citaActiva) throw new CustomHttpException( "El paciente ya tiene una cita activa.", HttpStatus.BAD_REQUEST);
        
        // ---------- CREAR Y GUARDAR ----------
        const cita = this.appointmentRepository.create({
            paciente,
            profesional,
            administrativo,
            fechaCita: citaDate,
            horaCita,
            modalidad,
            motivo,
            consultorio,
            estado: EstadosCita.CONFIRMADA
        });

        const saved = await this.appointmentRepository.save(cita);

        return {
            message: "Cita agendada exitosamente",
            paciente: `${saved.paciente.nombres} ${saved.paciente.apellidos}`,
            profesional: `${saved.profesional.persona.nombres} ${saved.profesional.persona.apellidos}`,
            fechaCita: saved.fechaCita,
            horaCita: saved.horaCita,
            modalidad: saved.modalidad,
            motivo: saved.motivo,
            consultorio: saved.consultorio,
            estado: saved.estado
        };
    }

    // Listar citas activas - ADMIN
    async adminListAppointments(document: string) {
        const paciente = await this.personRepository.findOne({
            where: { numeroDocumento: document },
            relations: [
                "citasComoPaciente",
                "citasComoPaciente.profesional",
                "citasComoPaciente.profesional.persona",
                "citasComoPaciente.administrativo",
                "citasComoPaciente.administrativo.persona"
            ],
        });

        if (!paciente) throw new CustomHttpException("No existe un paciente con este número de documento", HttpStatus.NOT_FOUND);

        if (!paciente.citasComoPaciente || paciente.citasComoPaciente.length === 0) {
            throw new CustomHttpException("El paciente no tiene citas registradas", HttpStatus.NOT_FOUND);
        }

        // Filtrar solo las citas activas
        let citasActivas = paciente.citasComoPaciente.filter(c => 
            c.estado === EstadosCita.CONFIRMADA
        );

        if (citasActivas.length === 0) {
            return {
                citas: []
            };
        }

        return {
            paciente: `${paciente.nombres} ${paciente.apellidos}`,
            totalCitas: citasActivas.length, // Mostrar el total de citas activas
            citas: citasActivas.map(c => ({
                idCita: c.idCita,
                fechaCita: c.fechaCita,
                horaCita: c.horaCita,
                modalidad: c.modalidad,
                motivo: c.motivo,
                consultorio: c.consultorio,
                estado: c.estado,
                profesional: c.profesional?.persona?.nombres 
                    ? `${c.profesional.persona.nombres} ${c.profesional.persona.apellidos}`
                    : null,
                administrativo: c.administrativo?.persona?.nombres
                    ? `${c.administrativo.persona.nombres} ${c.administrativo.persona.apellidos}`
                    : null
            }))
        };
    }

    // Listar todas las citas
    async listAppointments(document: string) {
        const paciente = await this.personRepository.findOne({
            where: { numeroDocumento: document },
            relations: [
                "citasComoPaciente",
                "citasComoPaciente.profesional",
                "citasComoPaciente.profesional.persona",
                "citasComoPaciente.administrativo",
                "citasComoPaciente.administrativo.persona"
            ],
        });

        if (!paciente) throw new CustomHttpException("No existe un paciente con este número de documento", HttpStatus.NOT_FOUND);

        if (paciente.citasComoPaciente.length === 0) {
            return {
                citas: [],
                message: "El paciente no tiene citas registradas"
            };
        }

        return {
            paciente: `${paciente.nombres} ${paciente.apellidos}`,
            totalCitas: paciente.citasComoPaciente.length,
            citas: paciente.citasComoPaciente.map(c => ({
                idCita: c.idCita,
                fechaCita: c.fechaCita,
                horaCita: c.horaCita,
                modalidad: c.modalidad,
                motivo: c.motivo,
                consultorio: c.consultorio,
                estado: c.estado,
                profesional: c.profesional?.persona?.nombres 
                    ? `${c.profesional.persona.nombres} ${c.profesional.persona.apellidos}`
                    : null,
                administrativo: c.administrativo?.persona?.nombres
                    ? `${c.administrativo.persona.nombres} ${c.administrativo.persona.apellidos}`
                    : null
            }))
        };
    }

    // Reprogramar cita - ADMIN
    async adminRescheduleAppointment(userFromToken, updateData: UpdateAppointmentDTO ) {
       
        if (userFromToken.role !== 'administrativo'){
            throw new CustomHttpException("Solo los administrativos pueden reprogramar citas", HttpStatus.FORBIDDEN);
        }
        const idAdministrativo = userFromToken.idPersona;

        const { idCita, fechaCita, horaCita, modalidad, motivo, consultorio, idProfesional } = updateData;

        // 1. Buscar la cita
        const cita = await this.appointmentRepository.findOne({
            where: { idCita },
            relations: ["paciente", "profesional", "profesional.persona", "administrativo", "administrativo.persona"]
        });

        if (!cita) throw new CustomHttpException("La cita no existe", HttpStatus.NOT_FOUND);

        // 2. Cambiar profesional si viene en el DTO
        if (idProfesional) {
            const profesional = await this.professionalRepository.findOne({
                where: { idProfesional },
                relations: ["persona"]
            });
            if (!profesional) throw new CustomHttpException("Profesional no encontrado", HttpStatus.NOT_FOUND);
            cita.profesional = profesional;
        }

        // 3. Cambiar administrativo si viene en el DTO
        if (idAdministrativo) {
            const administrativo = await this.adminRepository.findOne({ where: { idAdministrativo } });
            if (!administrativo) throw new CustomHttpException("Administrativo no encontrado", HttpStatus.NOT_FOUND);
            cita.administrativo = administrativo;
        }

        // 4. Validación de fecha
        if (fechaCita) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const newDate = new Date(fechaCita);

            if (newDate < today) {
                throw new CustomHttpException("La nueva fecha no puede ser anterior a hoy");
            }

            cita.fechaCita = newDate;
        }

        // 5. Validación de hora si se cambia
        if (horaCita) {
            // Si la reprogramación es hoy
            if (fechaCita) {
                const now = new Date();
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                const newDate = new Date(fechaCita);
                if (newDate.getTime() === currentDate.getTime()) {
                    const [h, m] = horaCita.split(":").map(Number);

                    if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) {
                        throw new CustomHttpException("La nueva hora debe ser mayor a la hora actual");
                    }
                }
            }

            cita.horaCita = horaCita;
        }

        // 6. Otros campos opcionales
        if (modalidad) cita.modalidad = modalidad;
        if (motivo) cita.motivo = motivo;
        if (consultorio) cita.consultorio = consultorio;

        // 7. Guardar cambios
        const updated = await this.appointmentRepository.save(cita);

        return {
            message: "Cita reprogramada exitosamente",
            fechaCita: updated.fechaCita,
            horaCita: updated.horaCita,
            modalidad: updated.modalidad,
            motivo: updated.motivo,
            consultorio: updated.consultorio,
            paciente: `${updated.paciente.nombres} ${updated.paciente.apellidos}`,
            profesional: `${updated.profesional.persona.nombres} ${updated.profesional.persona.apellidos}`
        };
    }

    // Cancelar cita - ADMIN
    async cancelAppointment(adminFromToken, dto: CancelAppointmentDTO) {
        if (adminFromToken.role !== 'administrativo') {
            throw new CustomHttpException("Solo los administrativos pueden crear citas", HttpStatus.FORBIDDEN);
        }

        const idAdministrativo = adminFromToken.idPersona; 

        const { idCita, motivo } = dto;

        // 1. Buscar la cita existente
        const cita = await this.appointmentRepository.findOne({
            where: { idCita },
            relations: ["administrativo", "administrativo.persona"]
        });

        if (!cita) {
            throw new CustomHttpException("La cita no existe", HttpStatus.NOT_FOUND);
        }

        // 2. Validar si ya está cancelada
        if (cita.estado === EstadosCita.CANCELADA) {
            throw new CustomHttpException("La cita ya está cancelada");
        }

        // 3. Buscar administrativo que ejecuta la acción
        const administrativo = await this.adminRepository.findOne({
            where: { idAdministrativo },
            relations: ["persona"]
        });

        if (!administrativo) {
            throw new CustomHttpException("El administrativo que intenta cancelar no existe", HttpStatus.NOT_FOUND);
        }

        // 4. Actualizar estado de la cita
        cita.estado = EstadosCita.CANCELADA;
        cita.motivo = motivo; // Guardar motivo de cancelación
        cita.administrativo = administrativo; // Registrar quién canceló

        await this.appointmentRepository.save(cita);

        // 5. Respuesta al cliente
        return {
            message: "La cita ha sido cancelada exitosamente",
            cita: {
                idCita: cita.idCita,
                fechaCita: cita.fechaCita,
                horaCita: cita.horaCita,
                estado: cita.estado,
                motivoCancelacion: motivo,
                canceladoPor: `${administrativo.persona.nombres} ${administrativo.persona.apellidos}`
            }
        };
    }
}
