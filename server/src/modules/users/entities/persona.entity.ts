import { Administrativo } from './administrativo.entity';
import { EstadosUsuario, Genero, Roles } from '../../../common/enums';
import { Profesional } from './profesional.entity';
import { Cita } from '../../appointments/entities/cita.entity';
import { HistoriaClinica } from '../../medical-histories/entities/historiaClinica.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('persona')
export class Persona {
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

  @Column({
    type: 'enum',
    enum: Genero,
    default: Genero.OTRO,
  })
  genero: Genero;

  @Column({ length: 100 })
  ciudadResidencia: string;

  @Column()
  celular: number;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 100 })
  eps: string;

  @Column({ length: 100 })
  nombresContactoEmergencia: string;

  @Column()
  celularContactoEmergencia: number;

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
