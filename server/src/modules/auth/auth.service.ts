import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PersonaBaseDto } from '../users/dto/persona-base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../users/entities/persona.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Persona)
        private userRepo: Repository<Persona>,
        private jwtService: JwtService
    ) { }

    /**
     * @description Registra un nuevo usuario:
     * 1. Hashea la contraseña proporcionada.
     * 2. Persiste el usuario en la base de datos.
     * 3. Devuelve un mensaje y los campos públicos del usuario (no incluye hash).
     * @param data - CreateUserDto con los datos del nuevo usuario (incluye password)
     * @returns objeto con mensaje y datos públicos del usuario creado
     */
    async register(data: PersonaBaseDto) {
        const hashedPassword = await bcrypt.hash(data.contrasena, 10);
        const userCreated = this.userRepo.create({ ...data, contrasena: hashedPassword });
        await this.userRepo.save(userCreated);
        return { message: 'Usuario registrado con exito', user: { id: userCreated.idPersona, email: userCreated.correo} }
    }

    /**
     * @description Autentica a un usuario:
     * 1. Buscar al usuario por email.
     * 2. Si no existe, lanzar UnauthorizedException.
     * 3. Comparar la contraseña proporcionada con el passwordHash usando bcrypt.compare.
     * 4. Si la contraseña es válida, generar y devolver un JWT con la información mínima del usuario.
     * @param data - LoginDto con email y password
     * @returns objeto con accessToken (JWT)
     * @throws UnauthorizedException en caso de credenciales inválidas
     */
     async login(data: LoginDTO) {
        const user = await this.userRepo.findOne({ where: { correo: data.email } })
        const isPasswordValid = await bcrypt.compare(data.password, user?.contrasena)

        if (!user || !isPasswordValid)
            throw new UnauthorizedException("Credenciales invalidas");
        

        const payloadToken = { sub: user.idPersona, name: user.nombres, email: user.correo, role: user.rol };
        const token = await this.jwtService.signAsync(payloadToken);

        return { accessToken: token }
    }
}
