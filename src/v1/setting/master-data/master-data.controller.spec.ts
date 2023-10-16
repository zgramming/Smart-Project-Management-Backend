import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataController } from './master-data.controller';
import { MasterDataService } from './master-data.service';

describe('MasterDataController', () => {
  let controller: MasterDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterDataController],
      providers: [MasterDataService],
    }).compile();

    controller = module.get<MasterDataController>(MasterDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
