import { Persona } from './persona.entity';
import { Cita } from '../../appointments/entities/cita.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('administrativo')
export class Administrativo {
  @PrimaryGeneratedColumn()
  idAdministrativo: number;

  @OneToOne(() => Persona, (p) => p.administrativo)
  @JoinColumn({ name: 'idPersona' })
  persona: Persona;

  @Column({ length: 100 })
  cargo: string;

  @OneToMany(() => Cita, (cita) => cita.administrativo)
  citas: Cita[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
