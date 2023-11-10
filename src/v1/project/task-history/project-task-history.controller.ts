import { Controller, Get } from '@nestjs/common';
import { ProjectTaskHistoryService } from './project-task-history.service';
import { prefixProjectTaskHistoryUrl } from 'src/utils/constant';

@Controller(`${prefixProjectTaskHistoryUrl}`)
export class ProjectTaskHistoryController {
  constructor(
    private readonly projectTaskHistoryService: ProjectTaskHistoryService,
  ) {}

  @Get()
  findAll() {
    return this.projectTaskHistoryService.findAll();
  }
}
