import { Module } from '@nestjs/common';
import { AccessCategoryModulService } from './access-category-modul.service';
import { AccessCategoryModulController } from './access-category-modul.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccessCategoryModulController],
  providers: [AccessCategoryModulService, PrismaService],
})
export class AccessCategoryModulModule {}
