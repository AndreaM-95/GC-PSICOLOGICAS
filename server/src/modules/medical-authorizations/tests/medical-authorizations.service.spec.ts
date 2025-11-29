import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAuthorizationsService } from './medical-authorizations.service';

describe('MedicalAuthorizationsService', () => {
  let service: MedicalAuthorizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalAuthorizationsService],
    }).compile();

    service = module.get<MedicalAuthorizationsService>(MedicalAuthorizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
