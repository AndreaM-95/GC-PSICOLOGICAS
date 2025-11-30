import * as dotenv from 'dotenv';
import { Cita } from './src/modules/appointments/entities/cita.entity';
import { MedicamentoRecetado } from './src/modules/medical-authorizations/entities/medicamentoRecetado.entity';
import { Antecedente } from './src/modules/medical-histories/entities/antecedente.entity';
import { Evolucion } from './src/modules/medical-histories/entities/evolucion.entity';
import { HistoriaClinica } from './src/modules/medical-histories/entities/historiaClinica.entity';
import { Intervencion } from './src/modules/medical-histories/entities/intervencion.entity';
import { Administrativo } from './src/modules/users/entities/administrativo.entity';
import { Persona } from './src/modules/users/entities/persona.entity';
import { Profesional } from './src/modules/users/entities/profesional.entity';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Persona, Administrativo, Profesional, Cita, HistoriaClinica, Antecedente, Evolucion, Intervencion, MedicamentoRecetado],
  migrations: ['./src/migrations/*.ts'],
});
