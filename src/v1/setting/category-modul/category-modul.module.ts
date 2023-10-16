import { Module } from '@nestjs/common';
import { CategoryModulService } from './category-modul.service';
import { CategoryModulController } from './category-modul.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CategoryModulController],
  providers: [CategoryModulService, PrismaService],
})
export class CategoryModulModule {}
