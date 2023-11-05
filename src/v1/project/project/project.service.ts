import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { handlingCustomError } from 'src/utils/function';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const result = await this.prismaService.project.create({
        data: {
          ...createProjectDto,
          startDate: new Date(createProjectDto.startDate),
          endDate: new Date(createProjectDto.endDate),
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

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.project.findMany({
        take: limit,
        skip: offset,
      });

      return {
        message: 'Projects retrieved successfully',
        error: false,
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
      const project = await this.prismaService.project.findUnique({
        where: { id: id },
      });

      if (!project) {
        throw new NotFoundException({
          error: true,
          message: `Project with id ${id} not found`,
        });
      }

      const result = await this.prismaService.project.update({
        where: { id: id },
        data: {
          ...updateProjectDto,
          startDate: new Date(updateProjectDto.startDate),
          endDate: new Date(updateProjectDto.endDate),
        },
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
