import { HistoriaClinica } from './historiaClinica.entity';
import { TipoAntecedente } from '../../../common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('antecedente')
export class Antecedente {
  @PrimaryGeneratedColumn()
  idAntecedente: number;

  @ManyToOne(() => HistoriaClinica, (h) => h.antecedentes)
  @JoinColumn({ name: 'idHistoria' })
  historia: HistoriaClinica;

  @Column({
    type: 'enum',
    enum: TipoAntecedente,
  })
  tipoAntecedente: TipoAntecedente;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn()
  createdAt: Date;
}
