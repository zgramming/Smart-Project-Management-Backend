import { Test, TestingModule } from '@nestjs/testing';
import { MasterCategoryService } from './master-category.service';

describe('MasterCategoryService', () => {
  let service: MasterCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterCategoryService],
    }).compile();

    service = module.get<MasterCategoryService>(MasterCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
