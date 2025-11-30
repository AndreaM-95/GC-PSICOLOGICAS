import { HistoriaClinica } from './historiaClinica.entity';
import { Profesional } from '../../users/entities/profesional.entity';
import { Intervencion } from './intervencion.entity';
import { MedicamentoRecetado } from '../../medical-authorizations/entities/medicamentoRecetado.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';


@Entity('evolucion')
export class Evolucion {
  @PrimaryGeneratedColumn()
  idEvolucion: number;

  @ManyToOne(() => HistoriaClinica, (h) => h.evoluciones)
  @JoinColumn({ name: 'idHistoria' })
  historia: HistoriaClinica;

  @ManyToOne(() => Profesional, (p) => p.evoluciones)
  @JoinColumn({ name: 'idProfesional' })
  profesional: Profesional;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'text' })
  motivoConsulta: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'text'})
  diagnostico: string;

  @Column({ type: 'text', nullable: true })
  planIntervencion?: string;

  @OneToMany(() => Intervencion, (i) => i.evolucion)
  intervenciones: Intervencion[];

  @OneToMany(() => MedicamentoRecetado, (m) => m.evolucion)
  medicamentos: MedicamentoRecetado[];

  @CreateDateColumn()
  createdAt: Date;
}
