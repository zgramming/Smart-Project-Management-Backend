import { Module } from '@nestjs/common';
import { AccessMenuService } from './access-menu.service';
import { AccessMenuController } from './access-menu.controller';

@Module({
  controllers: [AccessMenuController],
  providers: [AccessMenuService],
})
export class AccessMenuModule {}
