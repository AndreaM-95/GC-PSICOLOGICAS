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
import { ActualizarPacienteDTO } from './dto/actualizar-paciente.dto';
import { ActualizarAdminDTO } from './dto/actualizar-admin.dto';
import { ActualizarProfesionalDTO } from './dto/actualizar-profesional.dto';


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
    /**
     * @description Método de creación de administrativo con validaciones de edad mínima, correo corporativo y unicidad de datos
     * @param newAdmin 
     * @returns Mensaje de éxito una vez creado el administrativo en la base de datos
     */
    async createAdmin(newAdmin: CrearAdminDto) {
        const hashedPassword = await bcrypt.hash(newAdmin.contrasena, 10);
        const { cargo, ...personaData } = newAdmin;

        this.validateCorporateEmail(newAdmin.correo);
        this.validateMinimumAge(new Date(newAdmin.fechaNacimiento), 18);
        await this.validateUniquePersonaData(newAdmin.numeroDocumento, newAdmin.correo);

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
    
    /**
     * @description Método que trae la lista de los administrativos activos en el sistema
     * @returns La lista de los administrativos activos
     */
    async listAdministrators() {
        return this.listByRole(Roles.ADMINISTRATIVO);
    }

    /**
     * @description Método de actualización de datos de un administrativo, actualiza tanto la tabla persona como administrativo dependiendo de los datos que vengan en el DTO
     * @param rolFromToken 
     * @param id 
     * @param updateAdminDTO 
     * @returns El mensaje de actualización exitosa del administrativo
     */
    async updateAdmin(rolFromToken: any, id: number, updateAdminDTO: ActualizarAdminDTO) {
        const admin = await this.adminRepository.findOne({
            where: { idAdministrativo: id },
            relations: ["persona"]
        });

        if (!admin) {
            throw new CustomHttpException(
                "Administrador no encontrado",
                HttpStatus.NOT_FOUND
            );
        }

        const { cargo, ...personaData } = updateAdminDTO;
        
        // Actualiza PERSONA
        await this.updateUser(
            rolFromToken,
            admin.persona.idPersona,
            personaData
        );
        
        // Actualiza ADMIN (solo si viene cargo)
        if (cargo) await this.adminRepository.update(id, { cargo });    
        return { message: "Administrador actualizado correctamente" };
    }

    //------ CRUD PROFESIONAL ------
    /**
     * @description Método de creación de profesional con validaciones de edad mínima, correo corporativo, unicidad de datos y licencia profesional única
     * @param newProfessional 
     * @returns Datos del profesional creado en la base de datos
     */
    async createProfessional(newProfessional: CrearProfesionalDto) {
        const hashedPassword = await bcrypt.hash(newProfessional.contrasena, 10);
        const { licencia, especialidad, ...personaData } = newProfessional;

        this.validateCorporateEmail(newProfessional.correo);
        this.validateMinimumAge(new Date(newProfessional.fechaNacimiento), 20);
        await this.validateUniquePersonaData(
            newProfessional.numeroDocumento,
            newProfessional.correo
        );
        await this.validateUniqueLicense(licencia);

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

        return await this.professionalRepository.save(admin);
    }
    
    /**
     * @description Método que trae la lista de los profesionales activos en el sistema
     * @returns Lista de los profesionales activos
     */
    async listProfessionals() {
        return this.listByRole(Roles.PROFESIONAL);
    }

    /**
     * @description Método de actualización de datos de un profesional, actualiza tanto la tabla persona como profesional dependiendo de los datos que vengan en el DTO
     * @param rolFromToken 
     * @param id 
     * @param updateProfDTO 
     * @returns La actualización exitosa del profesional
     */
    async updateProf(rolFromToken: any, id: number, updateProfDTO: ActualizarProfesionalDTO) {
        const professional = await this.professionalRepository.findOne({
            where: { idProfesional: id },
            relations: ["persona"]
        });

        if (!professional) {
            throw new CustomHttpException(
                "Profesional no encontrado",
                HttpStatus.NOT_FOUND
            );
        }

        const { licencia, especialidad, ...personaData } = updateProfDTO;
        
        // Actualiza PERSONA
        await this.updateUser(
            rolFromToken,
            professional.persona.idPersona,
            personaData
        );
        
        // Actualiza Profesional (solo si viene licencia o especialidad)
        if (licencia || especialidad) await this.professionalRepository.update(id, { licencia, especialidad });    
        return { message: "Profesional actualizado correctamente" };
    }

    //-----------------------------------------------------------
    //------ PACIENTE ------
    /**
     * @description Método de creación de paciente con validaciones de edad mínima, correo corporativo y unicidad de datos
     * @param rolFromToken Recibe el token del login y extrae el rol
     * @param newPatient Tiene la estructura de datos para crear un paciente
     * @returns Un mensaje de éxito una vez creado
     */
    async createPatient(rolFromToken, newPatient: PersonaBaseDto) {
        this.validateMinimumAge(new Date(newPatient.fechaNacimiento), 6);

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

    /**
     * @description Método de actualización de datos de un paciente
     * @param rolFromToken Toma el rol del token al iniciar sesion
     * @param id Número único que identifica a cada paciente
     * @param updateUserDTO Estructura de datos para actualizar un paciente
     * @returns Mensaje de éxito
     */
    async updatePatient(rolFromToken, id:number, updatePatientDTO: ActualizarPacienteDTO) {
        await this.updateUser(rolFromToken, id, updatePatientDTO);
        return {message: "Paciente actualizado con éxito"};
    }


    //-----------------------------------------------------------
    //------ GENERALES ------

    //------ Helpers ------
    /**
     * @description Valida que el número de documento y correo sean únicos en la base de datos
     * @param numeroDocumento 
     * @param correo 
     */
    private async validateUniquePersonaData(numeroDocumento: string, correo: string) {
        const [existingDocument, existingEmail] = await Promise.all([
            this.personRepository.findOne({ where: { numeroDocumento } }),
            this.personRepository.findOne({ where: { correo } })
        ]);

        if (existingDocument || existingEmail) {
            throw new CustomHttpException(
                "El usuario ya se encuentra registrado",
                HttpStatus.CONFLICT
            );
        }
    }

    /**
     * @description Valida que el correo tenga el dominio corporativo específico
     * @param correo 
     */
    private validateCorporateEmail(correo: string) {
        if (!correo.endsWith("@psicogest.com.co")) {
            throw new CustomHttpException(
                "El correo debe ser corporativo (@psicogest.com.co)",
                HttpStatus.BAD_REQUEST
            );
        }
    }

    /**
     * @description Valida que el usuario cumpla con la edad mínima requerida para su rol
     * @param fechaNacimiento 
     * @param minAge 
     */
    private validateMinimumAge(fechaNacimiento: Date, minAge: number) {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
        if (age < minAge) throw new CustomHttpException( `El usuario debe tener al menos ${minAge} años`);
    }

    /**
     * @description Valida que la licencia profesional sea única en la base de datos
     * @param licencia 
     */
    private async validateUniqueLicense(licencia: string) {
        const existingLicense = await this.professionalRepository.findOne({
            where: { licencia }
        });

        if (existingLicense) {
            throw new CustomHttpException(
                "La licencia ya se encuentra registrada",
                HttpStatus.CONFLICT
            );
        }
    }

    /**
     * @description Consulta las relaciones por rol y estados de los usuarios en BDD
     * @param rol Enum que trae un listado de roles disponibles
     * @returns La relación y búsqueda de BDD
     */
    async listByRole(rol: Roles) {
        const relationsMap = {
            [Roles.ADMINISTRATIVO]: ["administrativo"],
            [Roles.PROFESIONAL]: ["profesional"],
            [Roles.PACIENTE]: []
        };

        // 1. Buscar TODOS (activos + inactivos)
        const allUsers = await this.personRepository.find({
            where: { rol },
            relations: relationsMap[rol]
        });

        // No existe ningún usuario
        if (allUsers.length === 0) {
            console.log("No existen usuarios en la base de datos");
            return [];
        }

        // 2. Filtrar activos
        const activeUsers = allUsers.filter(
            user => user.estado === EstadosUsuario.ACTIVO
        );

        // Existen pero están inactivos
        if (activeUsers.length === 0) {
            console.log("Los usuarios existen pero se encuentran inactivos");
            return [];
        }

        return activeUsers;
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
        if (existingEmail || existingDocument) throw new CustomHttpException(msg)

        const hashedPassword = await bcrypt.hash(newUser.contrasena, 10);
        const userCreated = this.personRepository.create({
            ...newUser,
            contrasena: hashedPassword
        });

        return this.personRepository.save(userCreated);
    }

    /**
     * @description Método de actualización de datos de un usuario
     * @param rolFromToken Toma el rol del token al iniciar sesion
     * @param id Número único que identifica a cada usuario
     * @param updateUserDTO Estructura de datos para actualizar un usuario
     * @returns El usuario actualizado
     */
    async updateUser(rolFromToken: any, id: number, updateUserDTO: any) {
        if (rolFromToken.role == Roles.PROFESIONAL) {
            throw new CustomHttpException(
                "No tienes permisos para actualizar usuarios",
                HttpStatus.FORBIDDEN
            );
        }

        const user = await this.personRepository.findOne({
            where: { idPersona: id }
        });

        if (!user) {
            throw new CustomHttpException(
                `Usuario con ID ${id} no encontrado`,
                HttpStatus.NOT_FOUND
            );
        }

        // Validar correo
        if (updateUserDTO.correo && updateUserDTO.correo !== user.correo) {
            const existEmail = await this.personRepository.findOne({
                where: { correo: updateUserDTO.correo }
            });

            if (existEmail) {
                throw new CustomHttpException(
                    `El correo ${updateUserDTO.correo} ya se encuentra en uso`,
                    HttpStatus.CONFLICT
                );
            }
        }

        // Hashear contraseña si viene
        if (updateUserDTO.contrasena) {
            updateUserDTO.contrasena = await bcrypt.hash(updateUserDTO.contrasena, 10);
        }

        // NO sobreescribimos estado automáticamente, Solo si viene explícitamente
        if (updateUserDTO.estado) {
            updateUserDTO.estado = updateUserDTO.estado; // o validar enum
        }

        return await this.personRepository.update(id, updateUserDTO);
    }

    /**
     * @description Valida el estado del usuario y procede a inactivarlo
     * @param rolFromToken  Toma el rol del token al iniciar sesion
     * @param id Número único que identifica a cada usuario
     * @returns Mensaje de éxito
     */
    async deactivateUser(rolFromToken, id:number) {
        if (rolFromToken.role == Roles.PROFESIONAL) {
            throw new CustomHttpException(
                "No tienes permisos para desactivar usuarios",
                HttpStatus.FORBIDDEN
            );
        }

        const userUpdate = await this.personRepository.findOne({
            where: { idPersona: id }
        });

        if (!userUpdate) {
            throw new CustomHttpException(
                `Usuario con ID ${id} no encontrado`,
                HttpStatus.NOT_FOUND
            );
        }

        if (userUpdate.estado !== EstadosUsuario.ACTIVO) {
            throw new CustomHttpException("Este usuario ya se encuentra inactivo");
        }

        userUpdate.estado = EstadosUsuario.INACTIVO;
        await this.personRepository.update(id, userUpdate);
        return { message: "Inactivación exitosa"};
    }
}
