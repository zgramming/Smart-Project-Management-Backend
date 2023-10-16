import { Test, TestingModule } from '@nestjs/testing';
import { AccessMenuService } from './access-menu.service';

describe('AccessMenuService', () => {
  let service: AccessMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessMenuService],
    }).compile();

    service = module.get<AccessMenuService>(AccessMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
