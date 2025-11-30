import { Module } from '@nestjs/common';
import { MedicalAuthorizationsController } from './medical-authorizations.controller';
import { MedicalAuthorizationsService } from './medical-authorizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoRecetado } from './entities/medicamentoRecetado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicamentoRecetado])],
  controllers: [MedicalAuthorizationsController],
  providers: [MedicalAuthorizationsService]
})
export class MedicalAuthorizationsModule {}
