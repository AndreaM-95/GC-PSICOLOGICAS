import { Evolucion } from './evolucion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('intervencion')
export class Intervencion {
  @PrimaryGeneratedColumn()
  idIntervencion: number;

  @ManyToOne(() => Evolucion, (e) => e.intervenciones)
  @JoinColumn({ name: 'idEvolucion' })
  evolucion: Evolucion;

  @Column({ length: 100 })
  tipoIntervencion: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn()
  createdAt: Date;
}
