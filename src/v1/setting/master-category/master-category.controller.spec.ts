import { Test, TestingModule } from '@nestjs/testing';
import { MasterCategoryController } from './master-category.controller';
import { MasterCategoryService } from './master-category.service';

describe('MasterCategoryController', () => {
  let controller: MasterCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterCategoryController],
      providers: [MasterCategoryService],
    }).compile();

    controller = module.get<MasterCategoryController>(MasterCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
