import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { IParameterFindAllQueryParam } from './query-param/parameter-findall.query';

@Injectable()
export class ParameterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createParameterDto: CreateParameterDto) {
    try {
      const result = await this.prisma.parameter.create({
        data: createParameterDto,
      });

      return {
        error: false,
        message: 'Parameter created successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: IParameterFindAllQueryParam) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const name = params?.name;
      console.log({ params });

      const result = await this.prisma.parameter.findMany({
        take: limit,
        skip: limit * (page - 1),
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      });

      const total = await this.prisma.parameter.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      });

      return {
        error: false,
        message: 'Parameter retrieved successfully',
        total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const parameter = await this.prisma.parameter.findUnique({
        where: { id },
      });

      if (!parameter) {
        throw new NotFoundException({
          error: true,
          message: 'Parameter not found',
        });
      }

      return {
        error: false,
        message: 'Parameter retrieved successfully',
        data: parameter,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const parameter = await this.prisma.parameter.findUnique({
        where: { code },
      });

      if (!parameter) {
        throw new NotFoundException({
          error: true,
          message: 'Parameter not found',
        });
      }

      return {
        error: false,
        message: 'Parameter retrieved successfully',
        data: parameter,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateParameterDto: UpdateParameterDto) {
    try {
      const parameter = await this.prisma.parameter.findUnique({
        where: { id },
      });

      if (!parameter) {
        throw new NotFoundException({
          error: true,
          message: 'Parameter not found',
        });
      }

      const result = await this.prisma.parameter.update({
        where: { id },
        data: updateParameterDto,
      });

      return {
        error: false,
        message: 'Parameter updated successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const parameter = await this.prisma.parameter.findUnique({
        where: { id },
      });

      if (!parameter) {
        throw new NotFoundException({
          error: true,
          message: 'Parameter not found',
        });
      }

      const result = await this.prisma.parameter.delete({
        where: { id },
      });

      return {
        error: false,
        message: 'Parameter deleted successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
