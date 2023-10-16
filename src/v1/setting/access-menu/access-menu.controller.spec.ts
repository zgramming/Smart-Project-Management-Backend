import { Test, TestingModule } from '@nestjs/testing';
import { AccessMenuController } from './access-menu.controller';
import { AccessMenuService } from './access-menu.service';

describe('AccessMenuController', () => {
  let controller: AccessMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessMenuController],
      providers: [AccessMenuService],
    }).compile();

    controller = module.get<AccessMenuController>(AccessMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
