import { Injectable } from '@nestjs/common';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';
import { PrismaService } from 'src/prisma.service';
import {
  handlingCustomError,
  removeFileUpload,
  uploadFile,
} from 'src/utils/function';
import { pathUploadDocument } from 'src/utils/constant';
import { IProjectDocumentFindAllQuery } from './query_param/project-document-findall.query';

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
            createdBy: createProjectDocumentDto.createdBy,
            description: createProjectDocumentDto.description,
            status: createProjectDocumentDto.status,
            file: '',
            projectId: createProjectDocumentDto.projectId,
          },
        });

        // Upload file to storage
        const filename = uploadFile(file, pathUploadDocument);

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

  async findAll(params?: IProjectDocumentFindAllQuery) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const clientId = params?.clientId;
      const projectId = params?.projectId;
      const name = params?.name;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.projectDocument.findMany({
        take: limit,
        skip: offset,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          Project: {
            id: projectId && Number(projectId),
            clientId: clientId,
          },
        },
        include: {
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const total = await this.prismaService.projectDocument.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          Project: {
            id: projectId && Number(projectId),
            clientId: clientId,
          },
        },
      });

      return {
        message: 'ProjectDocuments retrieved successfully',
        error: false,
        total: total,
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
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
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
          const filename = uploadFile(file, pathUploadDocument, {
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
