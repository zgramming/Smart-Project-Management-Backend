import { Module } from '@nestjs/common';
import { AccessModulService } from './access-modul.service';
import { AccessModulController } from './access-modul.controller';

@Module({
  controllers: [AccessModulController],
  providers: [AccessModulService],
})
export class AccessModulModule {}
