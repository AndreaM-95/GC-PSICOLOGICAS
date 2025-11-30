import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Persona } from './entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrativo } from './entities/administrativo.entity';
import { Profesional } from './entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona, Administrativo, Profesional])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
