import { Test, TestingModule } from '@nestjs/testing';
import { ModulService } from './modul.service';

describe('ModulService', () => {
  let service: ModulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulService],
    }).compile();

    service = module.get<ModulService>(ModulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
