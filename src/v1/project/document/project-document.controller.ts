import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  Query,
} from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';
import { prefixProjectDocumentUrl } from 'src/utils/constant';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(`${prefixProjectDocumentUrl}`)
export class ProjectDocumentController {
  constructor(
    private readonly projectDocumentService: ProjectDocumentService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
          message: 'File size is too large. Max 10MB',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Body() createProjectDocumentDto: CreateProjectDocumentDto,
  ) {
    return this.projectDocumentService.create(file, createProjectDocumentDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { page = 1, limit = 100, projectId, clientId, name } = query;

    return this.projectDocumentService.findAll({
      page: +page,
      limit: +limit,
      projectId,
      clientId,
      name,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectDocumentService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateProjectDocumentDto: UpdateProjectDocumentDto,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
          message: 'File size is too large. Max 10MB',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.projectDocumentService.update(
      id,
      updateProjectDocumentDto,
      file,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectDocumentService.remove(id);
  }
}
