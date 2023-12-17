import { Module } from '@nestjs/common';
import { ProjectTaskService } from './project-task.service';
import { ProjectTaskController } from './project-task.controller';
import { PrismaService } from 'src/prisma.service';
import { ProjectTaskHistoryService } from '../task-history/project-task-history.service';

@Module({
  controllers: [ProjectTaskController],
  providers: [ProjectTaskService, PrismaService, ProjectTaskHistoryService],
})
export class ProjectTaskModule {}
