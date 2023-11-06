import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class ProjectTaskService {
  constructor(private readonly prismaService: PrismaService) {}
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

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const limit = params?.limit || 100;
      const page = params?.page || 1;
      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectTask.findMany({
        take: limit,
        skip: offset,
        include: {
          Project: true,
          User: true,
        },
      });

      return {
        error: false,
        message: `All task has been fetched`,
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
          Project: true,
          User: true,
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
