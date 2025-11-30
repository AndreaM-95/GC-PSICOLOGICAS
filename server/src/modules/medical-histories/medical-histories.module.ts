import { Module } from '@nestjs/common';
import { MedicalHistoriesController } from './medical-histories.controller';
import { MedicalHistoriesService } from './medical-histories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './entities/historiaClinica.entity';
import { Antecedente } from './entities/antecedente.entity';
import { Evolucion } from './entities/evolucion.entity';
import { Intervencion } from './entities/intervencion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Antecedente, Evolucion, Intervencion])],
  controllers: [MedicalHistoriesController],
  providers: [MedicalHistoriesService]
})
export class MedicalHistoriesModule {}
