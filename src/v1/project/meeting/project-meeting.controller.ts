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
import { ProjectMeetingService } from './project-meeting.service';
import { CreateProjectMeetingDto } from './dto/create-project-meeting.dto';
import { UpdateProjectMeetingDto } from './dto/update-project-meeting.dto';
import { prefixProjectMeetingUrl } from 'src/utils/constant';

@Controller(`${prefixProjectMeetingUrl}`)
export class ProjectMeetingController {
  constructor(private readonly projectMeetingService: ProjectMeetingService) {}

  @Post()
  create(@Body() createProjectMeetingDto: CreateProjectMeetingDto) {
    return this.projectMeetingService.create(createProjectMeetingDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const {
      page = 1,
      limit = 100,
      name,
      projectId,
      // startDate,
      // endDate,
      method,
    } = query;
    return this.projectMeetingService.findAll({
      page: Number(page),
      limit: Number(limit),
      name: name,
      projectId: projectId,
      method: method,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMeetingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectMeetingDto: UpdateProjectMeetingDto,
  ) {
    return this.projectMeetingService.update(id, updateProjectMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMeetingService.remove(id);
  }
}
