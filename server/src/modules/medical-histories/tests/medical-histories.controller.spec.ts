import { Test, TestingModule } from '@nestjs/testing';
import { MedicalHistoriesController } from './medical-histories.controller';

describe('MedicalHistoriesController', () => {
  let controller: MedicalHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalHistoriesController],
    }).compile();

    controller = module.get<MedicalHistoriesController>(MedicalHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
