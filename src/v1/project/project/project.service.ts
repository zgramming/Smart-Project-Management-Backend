import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { IProjectFindAllQueryParam } from './query_param/project-findall.query';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const result = await this.prismaService.project.create({
        data: {
          clientId: createProjectDto.clientId,
          name: createProjectDto.name,
          code: createProjectDto.code,
          status: createProjectDto.status,
          startDate: new Date(createProjectDto.startDate),
          endDate: new Date(createProjectDto.endDate),
          ProjectMember: {
            createMany: {
              data: createProjectDto.members.map((value) => ({
                userId: value.userId,
              })),
            },
          },
        },
      });

      return {
        message: 'Project created successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: IProjectFindAllQueryParam) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const name = params?.name;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.project.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: offset,
        include: {
          ProjectClient: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          ProjectMember: {
            select: {
              id: true,
              userId: true,
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      const total = await this.prismaService.project.count();

      return {
        message: 'Projects retrieved successfully',
        error: false,
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prismaService.project.findUnique({
        where: { id: id },
        include: {
          ProjectClient: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          ProjectMember: {
            select: {
              id: true,
              userId: true,
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      return {
        message: 'Project retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prismaService.project.findUnique({
        where: { code: code },
        include: {
          ProjectMember: {
            include: {
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      return {
        message: 'Project retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const result = await this.prismaService.$transaction(async (trx) => {
        const project = await trx.project.findUnique({
          where: { id: id },
        });

        if (!project) {
          throw new NotFoundException({
            error: true,
            message: `Project with id ${id} not found`,
          });
        }

        // Update Project
        const update = await trx.project.update({
          where: { id: id },
          data: {
            clientId: updateProjectDto.clientId,
            name: updateProjectDto.name,
            code: updateProjectDto.code,
            status: updateProjectDto.status,
            startDate: new Date(updateProjectDto.startDate),
            endDate: new Date(updateProjectDto.endDate),
          },
        });

        // Update ProjectMember
        await trx.projectMember.deleteMany({
          where: { projectId: project.id },
        });

        // Create New ProjectMember
        await trx.projectMember.createMany({
          data: updateProjectDto.members.map((value) => ({
            projectId: id,
            userId: value.userId,
            status: value.status,
          })),
        });

        return update;
      });

      return {
        message: 'Project updated successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const project = await this.prismaService.project.findUnique({
        where: { id: id },
      });

      if (!project) {
        throw new NotFoundException({
          error: true,
          message: `Project with id ${id} not found`,
        });
      }

      const result = await this.prismaService.project.delete({
        where: { id: id },
      });

      return {
        message: 'Project deleted successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
