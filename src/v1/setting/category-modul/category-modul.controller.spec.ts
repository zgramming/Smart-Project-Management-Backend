import { Test, TestingModule } from '@nestjs/testing';
import { CategoryModulController } from './category-modul.controller';
import { CategoryModulService } from './category-modul.service';

describe('CategoryModulController', () => {
  let controller: CategoryModulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryModulController],
      providers: [CategoryModulService],
    }).compile();

    controller = module.get<CategoryModulController>(CategoryModulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
