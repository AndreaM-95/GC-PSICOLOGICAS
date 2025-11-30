import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { CrearAdminDto } from './dto/crear-admin.dto';
import { CrearProfesionalDto } from './dto/crear-profesional.dto';
import { PersonaBaseDto } from './dto/persona-base.dto';
import { Administrativo } from './entities/administrativo.entity';
import { Roles } from 'src/common/enums';
import { Profesional } from './entities/profesional.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Persona)
        private personRepository: Repository<Persona>,

        @InjectRepository(Administrativo)
        private adminRepository: Repository<Administrativo>,

        @InjectRepository(Profesional)
        private professionalRepository: Repository<Profesional>,
    ){}

    async createAdmin(newAdmin: CrearAdminDto) {
        const { cargo, ...personaData } = newAdmin;

        const persona = this.personRepository.create({
            ...personaData,
            rol: Roles.ADMINISTRATIVO,
        });

        const savedPersona = await this.personRepository.save(persona);

        const admin = this.adminRepository.create({
            cargo,
            persona: savedPersona,
        });

        return await this.adminRepository.save(admin);
    }

    //Crear profesional
    async createProfessional(newProfessional: CrearProfesionalDto) {
        const { licencia, especialidad, ...personaData } = newProfessional;

        const persona = this.personRepository.create({
            ...personaData,
            rol: Roles.PROFESIONAL,
        });

        const savedPersona = await this.personRepository.save(persona);

        const admin = this.professionalRepository.create({
            licencia,
            especialidad,
            persona: savedPersona,
        });

        return await this.professionalRepository.save(admin);
    }

    //Crear paciente
    async createPatient(newPatient: PersonaBaseDto) {
        const patientCreated = this.personRepository.create(newPatient);
        return this.personRepository.save(patientCreated);
    }

    //Buscar usuario por nombre o documento (solo personal)
    //Buscar usuario por nombre o documento (solo pacientes)
    //Buscar usuario por nombre o documento (solo medicos)

    //Actualizar rol
    //Actualizar estado
    //Actualizar información
}
