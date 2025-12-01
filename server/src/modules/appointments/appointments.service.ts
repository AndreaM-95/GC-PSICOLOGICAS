import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { EstadosCita } from 'src/common/enums';
import { Persona } from '../users/entities/persona.entity';
import { Administrativo } from '../users/entities/administrativo.entity';
import { Profesional } from '../users/entities/profesional.entity';

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
    // Cancelar cita - ADMIN
}
