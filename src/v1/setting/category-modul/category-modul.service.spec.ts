import { Test, TestingModule } from '@nestjs/testing';
import { CategoryModulService } from './category-modul.service';

describe('CategoryModulService', () => {
  let service: CategoryModulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryModulService],
    }).compile();

    service = module.get<CategoryModulService>(CategoryModulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
