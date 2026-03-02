import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { CrearAdminDto } from './dto/crear-admin.dto';
import { CrearProfesionalDto } from './dto/crear-profesional.dto';
import { PersonaBaseDto } from './dto/persona-base.dto';
import { Administrativo } from './entities/administrativo.entity';
import { EstadosUsuario, Roles } from 'src/common/enums';
import { Profesional } from './entities/profesional.entity';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from 'src/common/exceptions/custom-http.exception';


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

    //-----------------------------------------------------------
    //------ PERSONAL ------
    //------ CRUD ADMINISTRATIVO ------
    async createAdmin(newAdmin: CrearAdminDto) {
        const hashedPassword = await bcrypt.hash(newAdmin.contrasena, 10);
        const { cargo, ...personaData } = newAdmin;

        const persona = this.personRepository.create({
            ...personaData,
            contrasena: hashedPassword,
            rol: Roles.ADMINISTRATIVO,
        });

        const savedPersona = await this.personRepository.save(persona);

        const admin = this.adminRepository.create({
            cargo,
            persona: savedPersona,
        });

        return await this.adminRepository.save(admin);
    }
    


    async listAdministrators() {
        return this.listByRole(Roles.ADMINISTRATIVO);
    }

    //TODO:Actualizar rol
    //TODO:Actualizar estado

    //------ CRUD PROFESIONAL ------
    async createProfessional(newProfessional: CrearProfesionalDto) {
        const hashedPassword = await bcrypt.hash(newProfessional.contrasena, 10);
        const { licencia, especialidad, ...personaData } = newProfessional;

        const persona = this.personRepository.create({
            ...personaData,
            contrasena: hashedPassword,
            rol: Roles.PROFESIONAL,
        });

        const savedPersona = await this.personRepository.save(persona);

        const admin = this.professionalRepository.create({
            licencia,
            especialidad,
            persona: savedPersona,
        });

        //SU VALIDACIÓN SERÁ CON LA CÉDULA

        return await this.professionalRepository.save(admin);
    }
    //TODO:Buscar usuario por nombre o documento
    
    async listProfessionals() {
        return this.listByRole(Roles.PROFESIONAL);
    }

    //-----------------------------------------------------------
    //------ PACIENTE ------
    /**
     * @description Método que crea un usuario con el rol de paciente
     * @param rolFromToken Recibe el token del login y extrae el rol
     * @param newPatient Tiene la estructura de datos para crear un paciente
     * @returns Un mensaje de éxito una vez creado
     */
    async createPatient(rolFromToken, newPatient: PersonaBaseDto) {
        await this.createUser(rolFromToken, newPatient, "El paciente ya se encuentra registrado")
        return{
            message: "Paciente creado exitosamente",
            user: `${newPatient.nombres} ${newPatient.apellidos}`        
        }
    }

    /**
     * @description Método que trae la lista de los pacientes activos en el sistema
     * @returns La lista de los pacientes
     */
    async listPatients() {
        return this.listByRole(Roles.PACIENTE);
    }

    

    //-----------------------------------------------------------
    //------ GENERALES ------
    //TODO:Actualizar información
    //TODO:Buscar usuario por nombre o documento

    /**
     * @description Consulta las relaciones por rol y estados de los usuarios en BDD
     * @param rol Enum que trae un listado de roles disponibles
     * @returns La relación y búsqueda de BDD
     */
    private listByRole(rol: Roles) {
        const relationsMap = {
            [Roles.ADMINISTRATIVO]: ["administrativo"],
            [Roles.PROFESIONAL]: ["profesional"],
            [Roles.PACIENTE]: []
        };

        return this.personRepository.find({
            where: { rol, estado: EstadosUsuario.ACTIVO },
            relations: relationsMap[rol]
        });
    }

    /**
     * @description Método de creación de usuarios reutilizable
     * @param rolFromToken Toma el rol del token al iniciar sesion
     * @param newUser Estructura de datos para crear un usuario
     * @param msg Mensaje de error personalizado
     * @returns La creación del usuario en BDD
     */
    async createUser(rolFromToken:any, newUser:any, msg:string){
        if (rolFromToken.role == Roles.PROFESIONAL ) {
            throw new CustomHttpException("No tienes permisos para crear usuarios", HttpStatus.FORBIDDEN);
        }

        const existingDocument = await this.personRepository.findOne({where: { numeroDocumento: newUser.numeroDocumento }})
        const existingEmail = await this.personRepository.findOne({where: { correo: newUser.correo }})
        if (existingEmail || existingDocument) throw new CustomHttpException(msg, HttpStatus.BAD_REQUEST)

        const hashedPassword = await bcrypt.hash(newUser.contrasena, 10);
        const userCreated = this.personRepository.create({
            ...newUser,
            contrasena: hashedPassword
        });

        return this.personRepository.save(userCreated);
    }
}
