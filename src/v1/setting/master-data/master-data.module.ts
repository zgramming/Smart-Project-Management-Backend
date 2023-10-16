import { Module } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { MasterDataController } from './master-data.controller';

@Module({
  controllers: [MasterDataController],
  providers: [MasterDataService],
})
export class MasterDataModule {}
