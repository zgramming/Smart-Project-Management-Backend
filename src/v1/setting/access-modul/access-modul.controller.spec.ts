import { Test, TestingModule } from '@nestjs/testing';
import { AccessModulController } from './access-modul.controller';
import { AccessModulService } from './access-modul.service';

describe('AccessModulController', () => {
  let controller: AccessModulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessModulController],
      providers: [AccessModulService],
    }).compile();

    controller = module.get<AccessModulController>(AccessModulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
