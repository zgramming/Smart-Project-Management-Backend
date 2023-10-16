import { Module } from '@nestjs/common';
import { ModulService } from './modul.service';
import { ModulController } from './modul.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ModulController],
  providers: [ModulService, PrismaService],
})
export class ModulModule {}
