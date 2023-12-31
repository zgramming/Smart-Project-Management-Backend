import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { IProjectTaskFindAllQuery } from './query_param/project-task-findall.query';
import { UpdateStatusProjectTaskDto } from './dto/update-status-project-task.dto';
import { ProjectTaskHistoryService } from '../task-history/project-task-history.service';

@Injectable()
export class ProjectTaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectTaskHistoryService: ProjectTaskHistoryService,
  ) {}
  async create(createProjectTaskDto: CreateProjectTaskDto) {
    try {
      const result = await this.prismaService.projectTask.create({
        data: {
          ...createProjectTaskDto,
          startDate: new Date(createProjectTaskDto.startDate),
          endDate: new Date(createProjectTaskDto.endDate),
        },
      });

      return {
        error: false,
        message: `Task with name ${result.name} has been created`,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: IProjectTaskFindAllQuery) {
    try {
      const {
        limit = 100,
        page = 1,
        clientId,
        projectId,
        userId,
        status,
        name,
      } = params || {};
      const offset = (page - 1) * limit;
      const result = await this.prismaService.projectTask.findMany({
        take: limit,
        skip: offset,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          projectId: projectId,
          userId: userId,
          status: status,
          Project: {
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
          ProjectTaskHistory: {
            select: {
              id: true,
              userId: true,
              description: true,
              status: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              roleId: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const total = await this.prismaService.projectTask.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          projectId: projectId,
          userId: userId,
          status: status,
          Project: {
            clientId: clientId,
          },
        },
      });

      return {
        error: false,
        message: `All task has been fetched`,
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAllByMe(idUser: number, params?: IProjectTaskFindAllQuery) {
    try {
      const {
        limit = 100,
        page = 1,
        clientId,
        projectId,
        status,
        name,
      } = params || {};
      const offset = (page - 1) * limit;
      const result = await this.prismaService.projectTask.findMany({
        take: limit,
        skip: offset,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          projectId: projectId,
          userId: idUser,
          status: status,
          Project: {
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
          ProjectTaskHistory: {
            select: {
              id: true,
              userId: true,
              description: true,
              status: true,
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              roleId: true,
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const total = await this.prismaService.projectTask.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          projectId: projectId,
          userId: idUser,
          status: status,
          Project: {
            clientId: clientId,
          },
        },
      });

      return {
        error: false,
        message: `All task has been fetched`,
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.projectTask.findUnique({
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
          User: {
            select: {
              id: true,
              name: true,
              roleId: true,
              role: {
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
        error: false,
        message: `Task with id ${id} has been fetched`,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findHistory(id: string) {
    try {
      const result = await this.projectTaskHistoryService.findByProjectTaskId(
        id,
      );

      return result;
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: string, updateProjectTaskDto: UpdateProjectTaskDto) {
    try {
      const task = await this.prismaService.projectTask.findUnique({
        where: {
          id: id,
        },
      });

      if (!task) {
        throw new NotFoundException({
          error: true,
          message: `Task with id ${id} not found`,
        });
      }

      const result = await this.prismaService.projectTask.update({
        where: {
          id: id,
        },
        data: {
          ...updateProjectTaskDto,
          startDate: new Date(updateProjectTaskDto.startDate),
          endDate: new Date(updateProjectTaskDto.endDate),
        },
      });

      return {
        error: false,
        message: `Task with id ${id} has been updated`,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async updateStatus(
    id: string,
    userId: number,
    dto: UpdateStatusProjectTaskDto,
  ) {
    try {
      const task = await this.prismaService.projectTask.findUnique({
        where: {
          id: id,
        },
      });

      if (!task) {
        throw new NotFoundException({
          error: true,
          message: `Task with id ${id} not found`,
        });
      }

      const result = await this.prismaService.projectTask.update({
        where: {
          id: id,
        },
        data: {
          status: dto.status,
          updatedBy: userId,
          ProjectTaskHistory: {
            create: {
              linkTask: dto.linkTask,
              description: dto.description,
              status: dto.status,
              userId: userId,
            },
          },
        },
      });

      return {
        error: false,
        message: `Task with id ${id} has been updated`,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: string) {
    try {
      const task = await this.prismaService.projectTask.findUnique({
        where: {
          id: id,
        },
      });
      if (!task) {
        throw new NotFoundException({
          error: true,
          message: `Task with id ${id} not found`,
        });
      }

      const deleteTask = await this.prismaService.projectTask.delete({
        where: {
          id: id,
        },
      });

      return {
        error: false,
        message: `Task with id ${id} has been deleted`,
        data: deleteTask,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
