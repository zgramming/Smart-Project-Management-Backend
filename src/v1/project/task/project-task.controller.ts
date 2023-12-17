import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectTaskService } from './project-task.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { prefixProjectTaskUrl } from 'src/utils/constant';
import { UserPayloadJWT } from 'src/interface/user_payload_jwt.interface';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { UpdateStatusProjectTaskDto } from './dto/update-status-project-task.dto';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixProjectTaskUrl}`)
export class ProjectTaskController {
  constructor(private readonly projectTaskService: ProjectTaskService) {}

  @Post()
  create(@Body() createProjectTaskDto: CreateProjectTaskDto, @Req() req: any) {
    const {
      userPayloadJWT,
    }: {
      userPayloadJWT: UserPayloadJWT;
    } = req;

    createProjectTaskDto.createdBy = userPayloadJWT.sub;

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

  @Get('me')
  findAllByMe(@Query() query: any, @Req() req: any) {
    const {
      limit = 100,
      page = 1,
      name = undefined,
      clientId = undefined,
      projectId = undefined,
      status = undefined,
    } = query;
    const { userPayloadJWT }: { userPayloadJWT: UserPayloadJWT } = req;
    return this.projectTaskService.findAllByMe(userPayloadJWT.sub, {
      limit: Number(limit),
      page: Number(page),
      name,
      clientId,
      projectId,
      status,
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

  @Get(':id/history')
  findHistoryByProjectTaskId(@Param('id') id: string) {
    return this.projectTaskService.findHistory(id);
  }

  @Patch(':id/status')
  updateAndCreateHistory(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateStatusProjectTaskDto: UpdateStatusProjectTaskDto,
  ) {
    const { userPayloadJWT }: { userPayloadJWT: UserPayloadJWT } = req;
    return this.projectTaskService.updateStatus(
      id,
      userPayloadJWT.sub,
      updateStatusProjectTaskDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTaskService.remove(id);
  }
}
