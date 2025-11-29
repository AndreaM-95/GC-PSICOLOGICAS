import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAuthorizationsController } from '../medical-authorizations.controller';

describe('MedicalAuthorizationsController', () => {
  let controller: MedicalAuthorizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalAuthorizationsController],
    }).compile();

    controller = module.get<MedicalAuthorizationsController>(
      MedicalAuthorizationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
