import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { EstadosCita } from 'src/common/enums';
import { Persona } from '../users/entities/persona.entity';
import { Administrativo } from '../users/entities/administrativo.entity';
import { Profesional } from '../users/entities/profesional.entity';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';
import { CancelAppointmentDTO } from './dto/cancelAppointment.dto';

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

    // Crear cita - ADMIN
    async adminCreateAppointment(newAppointment: CreateAppointmentDTO) {
        const { idPaciente, idProfesional, idAdministrativo, fechaCita, horaCita, modalidad, motivo, consultorio } = newAppointment;

        // ---------- BUSCAR ENTIDADES ----------
        const paciente = await this.personRepository.findOne({ where: { idPersona: idPaciente } });
        if (!paciente) throw new NotFoundException('Paciente no encontrado');

        const profesional = await this.professionalRepository.findOne({
            where: { idProfesional },
            relations: ["persona"]
        });
        if (!profesional) throw new NotFoundException('Profesional no encontrado');

        const administrativo = await this.adminRepository.findOne({ where: { idAdministrativo } });
        if (!administrativo) throw new NotFoundException('Administrativo no encontrado');


        // ---------- CONSTRUIR FECHA SIN PROBLEMAS DE ZONA HORARIA ----------
        const [yy, mm, dd] = fechaCita.split('-').map(Number); 
        const citaDate = new Date(yy, mm - 1, dd); // <-- local time sin UTC shift


        // ---------- VALIDACIONES ----------
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (citaDate < today) {
            throw new BadRequestException('La fecha de cita no puede ser anterior a hoy.');
        }

        const now = new Date();

        if (citaDate.getTime() === today.getTime()) {
            const [hour, minute] = horaCita.split(':').map(Number);

            if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
                throw new BadRequestException('La hora debe ser mayor que la hora actual.');
            }
        }

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

    // Listar citas - ADMIN
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


        if (!paciente) throw new NotFoundException("No existe un paciente con este número de documento");

        if (!paciente.citasComoPaciente || paciente.citasComoPaciente.length === 0) {
            throw new NotFoundException("El paciente no tiene citas registradas");
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
    //TODO: Debe tomar el id cuando de click en el botón desde el frontend
    async adminRescheduleAppointment( updateData: UpdateAppointmentDTO ) {
        const { idCita, fechaCita, horaCita, modalidad, motivo, consultorio, idProfesional, idAdministrativo } = updateData;

        // 1. Buscar la cita
        const cita = await this.appointmentRepository.findOne({
            where: { idCita },
            relations: ["paciente", "profesional", "profesional.persona", "administrativo", "administrativo.persona"]
        });

        if (!cita) throw new NotFoundException("La cita no existe");

        // 2. Cambiar profesional si viene en el DTO
        if (idProfesional) {
            const profesional = await this.professionalRepository.findOne({
                where: { idProfesional },
                relations: ["persona"]
            });
            if (!profesional) throw new NotFoundException("Profesional no encontrado");
            cita.profesional = profesional;
        }

        // 3. Cambiar administrativo si viene en el DTO
        if (idAdministrativo) {
            const administrativo = await this.adminRepository.findOne({ where: { idAdministrativo } });
            if (!administrativo) throw new NotFoundException("Administrativo no encontrado");
            cita.administrativo = administrativo;
        }

        // 4. Validación de fecha
        if (fechaCita) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const newDate = new Date(fechaCita);

            if (newDate < today) {
                throw new BadRequestException("La nueva fecha no puede ser anterior a hoy");
            }

            cita.fechaCita = newDate; // ← CORRECCIÓN
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
                        throw new BadRequestException("La nueva hora debe ser mayor a la hora actual");
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
            cita: {
                idCita: updated.idCita,
                fechaCita: updated.fechaCita,
                horaCita: updated.horaCita,
                modalidad: updated.modalidad,
                motivo: updated.motivo,
                consultorio: updated.consultorio,
                paciente: `${updated.paciente.nombres} ${updated.paciente.apellidos}`,
                profesional: `${updated.profesional.persona.nombres} ${updated.profesional.persona.apellidos}`,
            }
        };
    }


    // Cancelar cita - ADMIN
    async cancelAppointment(dto: CancelAppointmentDTO) {
        const { idCita, motivo, idAdministrativo } = dto;

        // 1. Buscar la cita existente
        const cita = await this.appointmentRepository.findOne({
            where: { idCita },
            relations: ["administrativo", "administrativo.persona"]
        });

        if (!cita) {
            throw new NotFoundException("La cita no existe");
        }

        // 2. Validar si ya está cancelada
        if (cita.estado === EstadosCita.CANCELADA) {
            throw new BadRequestException("La cita ya está cancelada");
        }

        // 3. Buscar administrativo que ejecuta la acción
        const administrativo = await this.adminRepository.findOne({
            where: { idAdministrativo },
            relations: ["persona"]
        });

        if (!administrativo) {
            throw new NotFoundException("El administrativo que intenta cancelar no existe");
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
