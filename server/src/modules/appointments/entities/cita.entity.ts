import { EstadosCita, ModalidadCita } from '../../../common/enums';
import { Administrativo } from '../../users/entities/administrativo.entity';
import { Persona } from '../../users/entities/persona.entity';
import { Profesional } from '../../users/entities/profesional.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Cita')
export class Cita {
  @PrimaryGeneratedColumn()
  idCita: number;

  @ManyToOne(() => Persona, (p) => p.citasComoPaciente)
  @JoinColumn({ name: 'idPaciente' })
  paciente: Persona;

  @ManyToOne(() => Profesional, (p) => p.citas)
  @JoinColumn({ name: 'idProfesional' })
  profesional: Profesional;

  @ManyToOne(() => Administrativo, (a) => a.citas )
  @JoinColumn({ name: 'idAdministrativo' })
  administrativo: Administrativo;

  @Column({
    type: 'enum',
    enum: EstadosCita,
    default: EstadosCita.CONFIRMADA,
  })
  estado: EstadosCita;

  @Column({ type: 'date' })
  fechaCita: Date;

  @Column({ type: 'time' })
  horaCita: string;

  @Column({
    type: 'enum',
    enum: ModalidadCita,
    default: ModalidadCita.PRESENCIAL,
  })
  modalidad: ModalidadCita;

  @Column({ length: 255, nullable: true })
  motivo?: string;

  @Column({ length: 100, nullable: true })
  consultorio?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
