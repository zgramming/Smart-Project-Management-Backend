import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectClientService } from './project_client.service';
import { CreateProjectClientDto } from './dto/create-project_client.dto';
import { UpdateProjectClientDto } from './dto/update-project_client.dto';
import { prefixProjectClientUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixProjectClientUrl}`)
export class ProjectClientController {
  constructor(private readonly projectClientService: ProjectClientService) {}

  @Post()
  create(@Body() createProjectClientDto: CreateProjectClientDto) {
    return this.projectClientService.create(createProjectClientDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { limit = 100, page = 1 } = query;
    return this.projectClientService.findAll({
      limit: Number(limit),
      page: Number(page),
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectClientService.findOne(id);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.projectClientService.findByCode(code);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectClientDto: UpdateProjectClientDto,
  ) {
    return this.projectClientService.update(id, updateProjectClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectClientService.remove(id);
  }
}
