import { Module } from '@nestjs/common';
import { AccessMenuService } from './access-menu.service';
import { AccessMenuController } from './access-menu.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccessMenuController],
  providers: [AccessMenuService, PrismaService],
})
export class AccessMenuModule {}
