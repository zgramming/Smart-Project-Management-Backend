import { Module } from '@nestjs/common';
import { CategoryModulService } from './category-modul.service';
import { CategoryModulController } from './category-modul.controller';

@Module({
  controllers: [CategoryModulController],
  providers: [CategoryModulService],
})
export class CategoryModulModule {}
