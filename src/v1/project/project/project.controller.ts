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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { prefixProjectUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

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
