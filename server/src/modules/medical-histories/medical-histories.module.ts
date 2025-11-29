import { Module } from '@nestjs/common';
import { MedicalHistoriesController } from './medical-histories.controller';
import { MedicalHistoriesService } from './medical-histories.service';

@Module({
  controllers: [MedicalHistoriesController],
  providers: [MedicalHistoriesService]
})
export class MedicalHistoriesModule {}
