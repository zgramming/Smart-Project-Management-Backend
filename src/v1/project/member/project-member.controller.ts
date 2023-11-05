import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { prefixProjectMemberUrl } from 'src/utils/constant';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixProjectMemberUrl}`)
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.projectMemberService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }
}
