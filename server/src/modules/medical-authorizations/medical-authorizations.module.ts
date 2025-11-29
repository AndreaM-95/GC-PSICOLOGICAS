import { Module } from '@nestjs/common';
import { MedicalAuthorizationsController } from './medical-authorizations.controller';
import { MedicalAuthorizationsService } from './medical-authorizations.service';

@Module({
  controllers: [MedicalAuthorizationsController],
  providers: [MedicalAuthorizationsService]
})
export class MedicalAuthorizationsModule {}
