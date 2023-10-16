import { Test, TestingModule } from '@nestjs/testing';
import { ModulController } from './modul.controller';
import { ModulService } from './modul.service';

describe('ModulController', () => {
  let controller: ModulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulController],
      providers: [ModulService],
    }).compile();

    controller = module.get<ModulController>(ModulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
