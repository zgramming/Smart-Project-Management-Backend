import { Module } from '@nestjs/common';
import { ProjectTaskService } from './project-task.service';
import { ProjectTaskController } from './project-task.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectTaskController],
  providers: [ProjectTaskService, PrismaService],
})
export class ProjectTaskModule {}
