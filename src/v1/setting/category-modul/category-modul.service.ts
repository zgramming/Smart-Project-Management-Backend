import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryModulDto } from './dto/create-category-modul.dto';
import { UpdateCategoryModulDto } from './dto/update-category-modul.dto';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { handlingCustomError } from 'src/utils/function';

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

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const { limit = 100, page = 1 } = params;
      const result = await this.prisma.categoryModul.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        error: false,
        message: 'Category modul list',
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
