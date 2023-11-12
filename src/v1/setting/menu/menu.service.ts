import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { IMenuFindAllQueryParams } from './query-param/menu-findall.query';

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

  async findAll(params?: IMenuFindAllQueryParams) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const name = params?.name;

      const result = await this.prisma.menu.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          parentMenuId: true,
          modulId: true,
          name: true,
          code: true,
          prefix: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          Modul: {
            select: {
              id: true,
              name: true,
              categoryModulId: true,
              CategoryModul: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          ParentMenu: {
            select: {
              id: true,
              name: true,
            },
          },
          ChildrenMenu: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const total = await this.prisma.menu.count();

      return {
        error: false,
        message: 'Menu has been retrieved',
        total,
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

  async findByModulId(modulId: number) {
    try {
      const result = await this.prisma.menu.findMany({
        where: { modulId },
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
