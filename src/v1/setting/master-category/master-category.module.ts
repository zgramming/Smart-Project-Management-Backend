import { Module } from '@nestjs/common';
import { MasterCategoryService } from './master-category.service';
import { MasterCategoryController } from './master-category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MasterCategoryController],
  providers: [MasterCategoryService, PrismaService],
})
export class MasterCategoryModule {}
