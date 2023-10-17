import { Module } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { MasterDataController } from './master-data.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MasterDataController],
  providers: [MasterDataService, PrismaService],
})
export class MasterDataModule {}
