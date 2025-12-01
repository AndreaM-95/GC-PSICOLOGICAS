import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Persona } from '../users/entities/persona.entity';
import { Administrativo } from '../users/entities/administrativo.entity';
import { Profesional } from '../users/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Persona, Administrativo, Profesional])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
