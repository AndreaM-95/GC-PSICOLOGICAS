import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Persona } from '../../users/entities/persona.entity';
import { EstadosUsuario } from 'src/common/enums';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(Persona)
    private personRepo: Repository<Persona>,
  ) {
    const secret = configService.get<string>('JWT_SECRET_KEY');
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    this.logger.log('JWT Strategy initialized successfully');
  }

  async validate(payload: any) {
    this.logger.log(`Validating JWT token for Persona ID: ${payload.sub}`);

    const persona = await this.personRepo.findOne({
      where: { idPersona: payload.sub },
      relations: ['profesional', 'administrativo'],
    });

    if (!persona) {
      this.logger.warn(`Validation failed: Persona not found (ID: ${payload.sub})`);
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (persona.estado !== EstadosUsuario.ACTIVO) {
      this.logger.warn(`Validation failed: Persona is inactive (ID: ${persona.idPersona})`);
      throw new UnauthorizedException('Usuario inactivo');
    }

    this.logger.log(
      `JWT validation successful for: ${persona.correo} (ID: ${persona.idPersona})`
    );

    return {
      idPersona: persona.idPersona,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      correo: persona.correo,
      rol: persona.rol,
      estado: persona.estado,
    };
  }
}
