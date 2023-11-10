import { Module } from '@nestjs/common';
import { ProjectTaskHistoryService } from './project-task-history.service';
import { ProjectTaskHistoryController } from './project-task-history.controller';

@Module({
  controllers: [ProjectTaskHistoryController],
  providers: [ProjectTaskHistoryService],
})
export class ProjectTaskHistoryModule {}
