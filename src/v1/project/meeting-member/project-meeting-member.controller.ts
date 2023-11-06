import { Controller, Get, Param } from '@nestjs/common';
import { ProjectMeetingMemberService } from './project-meeting-member.service';

@Controller('project-meeting-member')
export class ProjectMeetingMemberController {
  constructor(
    private readonly projectMeetingMemberService: ProjectMeetingMemberService,
  ) {}

  @Get()
  findAll() {
    return this.projectMeetingMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMeetingMemberService.findOne(id);
  }
}
