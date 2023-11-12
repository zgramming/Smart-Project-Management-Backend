import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryModulDto } from './dto/create-category-modul.dto';
import { UpdateCategoryModulDto } from './dto/update-category-modul.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { ICategoryModulFindAllQueryParams } from './query-param/category-modul-findall.query';

@Injectable()
export class CategoryModulService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryModulDto: CreateCategoryModulDto) {
    try {
      const result = await this.prisma.categoryModul.create({
        data: createCategoryModulDto,
      });
      return {
        error: false,
        message: 'Category modul created successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: ICategoryModulFindAllQueryParams) {
    try {
      const { limit = 100, page = 1, name } = params;
      const result = await this.prisma.categoryModul.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: (page - 1) * limit,
      });

      const total = await this.prisma.categoryModul.count();

      return {
        error: false,
        message: 'Category modul list',
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.categoryModul.findUnique({
        where: { id: id },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Category modul not found with id ' + id,
        });
      }

      return {
        error: false,
        message: 'Category modul found',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prisma.categoryModul.findUnique({
        where: { code: code },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Category modul not found with code ' + code,
        });
      }

      return {
        error: false,
        message: 'Category modul found',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateCategoryModulDto: UpdateCategoryModulDto) {
    try {
      const isExist = await this.prisma.categoryModul.findUnique({
        where: { id: id },
      });

      if (!isExist) {
        throw new NotFoundException({
          error: true,
          message: 'Category modul not found with id ' + id,
        });
      }

      const result = await this.prisma.categoryModul.update({
        where: { id: id },
        data: updateCategoryModulDto,
      });

      return {
        error: false,
        message: 'Category modul updated successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const isExist = await this.prisma.categoryModul.findUnique({
        where: { id: id },
      });

      if (!isExist) {
        throw new NotFoundException({
          error: true,
          message: 'Category modul not found with id ' + id,
        });
      }

      const result = await this.prisma.categoryModul.delete({
        where: { id: id },
      });

      return {
        error: false,
        message: 'Category modul deleted successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
