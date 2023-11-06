import { Injectable } from '@nestjs/common';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';
import { PrismaService } from 'src/prisma.service';
import {
  handlingCustomError,
  handlingFileUpload,
  removeFileUpload,
} from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { pathUploadDocument } from 'src/utils/constant';

@Injectable()
export class ProjectDocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    file: Express.Multer.File,
    createProjectDocumentDto: CreateProjectDocumentDto,
  ) {
    try {
      const result = await this.prismaService.$transaction(async () => {
        // Insert projectDocument to database
        const create = await this.prismaService.projectDocument.create({
          data: {
            name: createProjectDocumentDto.name,
            file: '',
            projectId: createProjectDocumentDto.projectId,
          },
        });

        // Upload file to storage
        const filename = handlingFileUpload(file, pathUploadDocument);

        // Update file name in database
        const update = await this.prismaService.projectDocument.update({
          where: {
            id: create.id,
          },
          data: {
            file: filename,
          },
        });

        return update;
      });

      return {
        message: 'ProjectDocument created successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.projectDocument.findMany({
        take: limit,
        skip: offset,
        include: {
          Project: true,
        },
      });

      return {
        message: 'ProjectDocuments retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.projectDocument.findUnique({
        where: {
          id: id,
        },
        include: {
          Project: true,
        },
      });

      return {
        message: 'ProjectDocument retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(
    id: string,
    updateProjectDocumentDto: UpdateProjectDocumentDto,
    file?: Express.Multer.File,
  ) {
    try {
      console.log({
        id: id,
        file: file,
        updateProjectDocumentDto: updateProjectDocumentDto,
      });

      const result = await this.prismaService.$transaction(async () => {
        let updateProject = await this.prismaService.projectDocument.update({
          where: {
            id: id,
          },
          data: {
            ...updateProjectDocumentDto,
          },
        });

        if (file) {
          // Upload file to storage
          const filename = handlingFileUpload(file, pathUploadDocument, {
            name: updateProject.file,
          });

          // Update file name in database
          const result = await this.prismaService.projectDocument.update({
            where: {
              id: updateProject.id,
            },
            data: {
              file: filename,
            },
          });

          updateProject = result;
        }

        return updateProject;
      });

      return {
        message: 'ProjectDocument updated successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prismaService.$transaction(async () => {
        const projectDocument = await this.prismaService.projectDocument.delete(
          {
            where: {
              id: id,
            },
          },
        );

        // After delete projectDocument, delete file in storage
        const path = `${pathUploadDocument}/${projectDocument.file}`;
        removeFileUpload(path);

        return projectDocument;
      });

      return {
        message: 'ProjectDocument deleted successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
