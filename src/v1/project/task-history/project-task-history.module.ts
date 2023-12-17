import { Module } from '@nestjs/common';
import { ProjectTaskHistoryService } from './project-task-history.service';
import { ProjectTaskHistoryController } from './project-task-history.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectTaskHistoryController],
  providers: [ProjectTaskHistoryService, PrismaService],
})
export class ProjectTaskHistoryModule {}
