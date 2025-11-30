import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Profesional } from './profesional.entity';
import { Administrativo } from './administrativo.entity';
import { Cita } from './cita.entity';
import { HistoriaClinica } from './historiaClinica.entity';
import { EstadosUsuario, Roles } from 'src/common/enums';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  idPersona: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 20 })
  tipoDocumento: string;

  @Column({ length: 50, unique: true })
  numeroDocumento: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ length: 20 })
  genero: string;

  @Column({ length: 100 })
  ciudadResidencia: string;

  @Column()
  celular: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 100, nullable: true })
  eps?: string;

  @Column({ type: 'text', nullable: true })
  nombresContactoEmergencia?: string;

  @Column({ nullable: true })
  celularContactoEmergencia?: string;

  @Column({ length: 100 })
  contrasena: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.PACIENTE,
  })
  rol: Roles;

  @Column({
    type: 'enum',
    enum: EstadosUsuario,
    default: EstadosUsuario.ACTIVO,
  })
  estado: EstadosUsuario;

  // Relations
  @OneToOne(() => Profesional, (p) => p.persona, { cascade: true })
  profesional?: Profesional;

  @OneToOne(() => Administrativo, (a) => a.persona, { cascade: true })
  administrativo?: Administrativo;

  @OneToMany(() => Cita, (cita) => cita.paciente)
  citasComoPaciente: Cita[];

  @OneToOne(() => HistoriaClinica, (h) => h.paciente)
  historiaClinica?: HistoriaClinica;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
