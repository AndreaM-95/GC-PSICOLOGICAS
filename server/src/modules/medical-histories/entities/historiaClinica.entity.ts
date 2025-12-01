import { Persona } from '../../users/entities/persona.entity';
import { Evolucion } from './evolucion.entity';
import { Antecedente } from './antecedente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
  CreateDateColumn
} from 'typeorm';


@Entity('historiaClinica')
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  idHistoria: number;

  @OneToOne(() => Persona, (p) => p.historiaClinica, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPaciente' })
  paciente: Persona;

  @Column({ type: 'date' })
  fechaCreacion: Date;

  @OneToMany(() => Evolucion, (e) => e.historia)
  evoluciones: Evolucion[];

  @OneToMany(() => Antecedente, (a) => a.historia)
  antecedentes: Antecedente[];

  @CreateDateColumn()
  createdAt: Date;
}
