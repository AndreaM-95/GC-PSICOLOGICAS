import { Persona } from './persona.entity';
import { Cita } from '../../appointments/entities/cita.entity';
import { Evolucion } from '../../medical-histories/entities/evolucion.entity';
import { Especialidad } from '../../../common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profesional')
export class Profesional {
  @PrimaryGeneratedColumn()
  idProfesional: number;

  @OneToOne(() => Persona, (p) => p.profesional)
  @JoinColumn({ name: 'idPersona' })
  persona: Persona;

  @Column({ length: 100 })
  licencia: string;

  @Column({
    type: 'enum',
    enum: Especialidad,
    default: Especialidad.PSICOLOGÍA,
  })
  especialidad: Especialidad;

  @OneToMany(() => Cita, (cita) => cita.profesional)
  citas: Cita[];

  @OneToMany(() => Evolucion, (evol) => evol.profesional)
  evoluciones: Evolucion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
