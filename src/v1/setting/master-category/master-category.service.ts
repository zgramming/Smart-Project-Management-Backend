import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterCategoryDto } from './dto/create-master-category.dto';
import { UpdateMasterCategoryDto } from './dto/update-master-category.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class MasterCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMasterCategoryDto: CreateMasterCategoryDto) {
    try {
      const result = await this.prisma.masterCategory.create({
        data: createMasterCategoryDto,
      });

      return {
        error: false,
        message: 'Master Category created successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const { limit = 100, page = 1 } = params;
      const result = await this.prisma.masterCategory.findMany({
        take: Number(limit),
        skip: Number((page - 1) * limit),
      });

      return {
        error: false,
        message: 'Master Category retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.masterCategory.findUnique({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Master Category not found',
        });
      }

      return {
        error: false,
        message: 'Master Category retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prisma.masterCategory.findUnique({
        where: { code },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'Master Category not found',
        });
      }

      return {
        error: false,
        message: 'Master Category retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateMasterCategoryDto: UpdateMasterCategoryDto) {
    try {
      const masterCategory = await this.prisma.masterCategory.findUnique({
        where: { id },
      });

      if (!masterCategory) {
        throw new NotFoundException({
          error: true,
          message: 'Master Category not found',
        });
      }

      const result = await this.prisma.masterCategory.update({
        where: { id },
        data: updateMasterCategoryDto,
      });

      return {
        error: false,
        message: 'Master Category updated successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const masterCategory = await this.prisma.masterCategory.findUnique({
        where: { id },
      });

      if (!masterCategory) {
        throw new NotFoundException({
          error: true,
          message: 'Master Category not found',
        });
      }

      const result = await this.prisma.masterCategory.delete({
        where: { id },
      });

      return {
        error: false,
        message: 'Master Category deleted successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
