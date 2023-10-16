import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModulDto } from './dto/create-modul.dto';
import { UpdateModulDto } from './dto/update-modul.dto';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { handlingCustomError } from 'src/utils/function';

@Injectable()
export class ModulService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createModulDto: CreateModulDto) {
    try {
      const result = await this.prisma.modul.create({
        data: createModulDto,
      });

      return {
        error: false,
        message: 'Modul has been created',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const { page = 1, limit = 100 } = params;
      const result = await this.prisma.modul.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        error: false,
        message: 'Modul has been retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.modul.findUnique({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Modul not found',
        });
      }

      return {
        error: false,
        message: 'Modul has been retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prisma.modul.findUnique({
        where: { code },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Modul not found',
        });
      }

      return {
        error: false,
        message: 'Modul has been retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateModulDto: UpdateModulDto) {
    try {
      const modul = await this.prisma.modul.findUnique({
        where: { id },
      });

      if (!modul) {
        throw new NotFoundException({
          error: true,
          message: 'Modul not found',
        });
      }

      const result = await this.prisma.modul.update({
        where: { id },
        data: updateModulDto,
      });

      return {
        error: false,
        message: 'Modul has been updated',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const modul = await this.prisma.modul.findUnique({
        where: { id },
      });

      if (!modul) {
        throw new NotFoundException({
          error: true,
          message: 'Modul not found',
        });
      }

      const result = await this.prisma.modul.delete({
        where: { id },
      });

      return {
        error: false,
        message: 'Modul has been deleted',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
