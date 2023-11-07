import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectClientDto } from './dto/create-project_client.dto';
import { UpdateProjectClientDto } from './dto/update-project_client.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class ProjectClientService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProjectClientDto: CreateProjectClientDto) {
    try {
      const result = await this.prismaService.projectClient.create({
        data: createProjectClientDto,
      });

      return {
        message: 'Project Client created successfully',
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
      const result = await this.prismaService.projectClient.findMany({
        take: limit,
        skip: offset,
        include: {
          _count: {
            select: {
              Project: true,
            },
          },
        },
      });

      const total = await this.prismaService.projectClient.count();

      return {
        message: 'ProjectClients retrieved successfully',
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
      const result = await this.prismaService.projectClient.findUnique({
        where: { id: id },
      });

      return {
        message: 'ProjectClient retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prismaService.projectClient.findUnique({
        where: { code: code },
      });

      return {
        message: 'ProjectClient retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: string, updateProjectClientDto: UpdateProjectClientDto) {
    try {
      const client = await this.prismaService.projectClient.findUnique({
        where: { id: id },
      });

      if (!client) {
        throw new NotFoundException({
          error: true,
          message: 'ProjectClient not found',
        });
      }

      const result = await this.prismaService.projectClient.update({
        where: { id: id },
        data: updateProjectClientDto,
      });

      return {
        message: 'ProjectClient updated successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: string) {
    try {
      const client = await this.prismaService.projectClient.findUnique({
        where: { id: id },
      });

      if (!client) {
        throw new NotFoundException({
          error: true,
          message: 'ProjectClient not found',
        });
      }

      const result = await this.prismaService.projectClient.delete({
        where: { id: id },
      });

      return {
        message: 'ProjectClient deleted successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
