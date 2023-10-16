import { Module } from '@nestjs/common';
import { ModulService } from './modul.service';
import { ModulController } from './modul.controller';

@Module({
  controllers: [ModulController],
  providers: [ModulService],
})
export class ModulModule {}
