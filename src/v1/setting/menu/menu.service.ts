import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const result = await this.prisma.menu.create({
        data: createMenuDto,
      });

      return {
        error: false,
        message: 'Menu has been created',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const { page = 1, limit = 100 } = params;
      const result = await this.prisma.menu.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        error: false,
        message: 'Menu has been retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.menu.findUnique({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Menu not found',
        });
      }

      return {
        error: false,
        message: 'Menu has been retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id },
      });

      if (!menu) {
        throw new NotFoundException({
          error: true,
          message: 'Menu not found',
        });
      }

      const result = await this.prisma.menu.update({
        where: { id },
        data: updateMenuDto,
      });

      return {
        error: false,
        message: 'Menu has been updated',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id },
      });

      if (!menu) {
        throw new NotFoundException({
          error: true,
          message: 'Menu not found',
        });
      }

      const result = await this.prisma.menu.delete({
        where: { id },
      });

      return {
        error: false,
        message: 'Menu has been deleted',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
