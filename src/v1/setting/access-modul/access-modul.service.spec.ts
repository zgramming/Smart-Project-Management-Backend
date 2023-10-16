import { Test, TestingModule } from '@nestjs/testing';
import { AccessModulService } from './access-modul.service';

describe('AccessModulService', () => {
  let service: AccessModulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessModulService],
    }).compile();

    service = module.get<AccessModulService>(AccessModulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
