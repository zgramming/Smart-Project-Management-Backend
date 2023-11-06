import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectTaskService } from './project-task.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { prefixProjectTaskUrl } from 'src/utils/constant';

@Controller(`${prefixProjectTaskUrl}`)
export class ProjectTaskController {
  constructor(private readonly projectTaskService: ProjectTaskService) {}

  @Post()
  create(@Body() createProjectTaskDto: CreateProjectTaskDto) {
    return this.projectTaskService.create(createProjectTaskDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.projectTaskService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTaskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectTaskDto: UpdateProjectTaskDto,
  ) {
    return this.projectTaskService.update(id, updateProjectTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTaskService.remove(id);
  }
}
