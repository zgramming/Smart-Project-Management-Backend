import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { prefixProjectUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { UserPayloadJWT } from 'src/interface/user_payload_jwt.interface';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixProjectUrl}`)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1, name = undefined } = query;
    return this.projectService.findAll({
      limit: Number(limit),
      page: Number(page),
      name: name,
    });
  }

  @Get('me')
  findAllByMe(@Query() query: any, @Req() req: any) {
    const { limit = 100, page = 1, name = undefined } = query;
    const {
      userPayloadJWT,
    }: {
      userPayloadJWT: UserPayloadJWT;
    } = req;

    return this.projectService.findAllByMe(userPayloadJWT.sub, {
      limit: Number(limit),
      page: Number(page),
      name: name,
    });
  }

  @Get('resume-dashboard/owner')
  getResumeDashboardOwner(@Query() query: any) {
    const { year = undefined } = query;
    return this.projectService.getResumeDashboardOwner({
      year,
    });
  }

  @Get('resume-dashboard/project-manager')
  getResumeDashboardProjectManager(@Query() query: any, @Req() req: any) {
    const { userPayloadJWT }: { userPayloadJWT: UserPayloadJWT } = req;
    const { year = undefined } = query;
    return this.projectService.getResumeDashboardProjectManager(
      userPayloadJWT.sub,
      {
        year,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.projectService.findByCode(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
