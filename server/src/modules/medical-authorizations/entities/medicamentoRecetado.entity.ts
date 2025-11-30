import { EstadoAutorizacion } from '../../../common/enums';
import { Evolucion } from '../../medical-histories/entities/evolucion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('MedicamentoRecetado')
export class MedicamentoRecetado {
  @PrimaryGeneratedColumn()
  idMedicamentoRecetado: number;

  @ManyToOne(() => Evolucion, (e) => e.medicamentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idEvolucion' })
  evolucion: Evolucion;

  @Column({ length: 200 })
  nombreMedicamento: string;

  @Column({ length: 100 })
  dosis: string;

  @Column({ length: 100 })
  frecuencia: string;

  @Column({ length: 100 })
  duracion: string;

  @Column({ type: 'date' })
  fechaExpiracion: Date;

  @Column({
    type: 'enum',
    enum: EstadoAutorizacion,
    default: EstadoAutorizacion.PENDIENTE,
  })
  estadoAutorizacion: EstadoAutorizacion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
