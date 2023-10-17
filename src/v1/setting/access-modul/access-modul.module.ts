import { Module } from '@nestjs/common';
import { AccessModulService } from './access-modul.service';
import { AccessModulController } from './access-modul.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccessModulController],
  providers: [AccessModulService, PrismaService],
})
export class AccessModulModule {}
