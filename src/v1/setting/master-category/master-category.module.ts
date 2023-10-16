import { Module } from '@nestjs/common';
import { MasterCategoryService } from './master-category.service';
import { MasterCategoryController } from './master-category.controller';

@Module({
  controllers: [MasterCategoryController],
  providers: [MasterCategoryService],
})
export class MasterCategoryModule {}
