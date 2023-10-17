import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterDatumDto } from './dto/create-master-datum.dto';
import { UpdateMasterDatumDto } from './dto/update-master-datum.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class MasterDataService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMasterDatumDto: CreateMasterDatumDto) {
    try {
      const masterCategory = await this.prisma.masterCategory.findUnique({
        where: { id: createMasterDatumDto.masterCategoryId },
      });

      if (!masterCategory) {
        throw new NotFoundException({
          error: false,
          message: `Master Category with id ${createMasterDatumDto.masterCategoryId} not found`,
        });
      }

      const masterCategoryCode = masterCategory.code;

      const result = await this.prisma.masterData.create({
        data: {
          ...createMasterDatumDto,
          masterCategoryCode,
        },
      });

      return {
        error: false,
        message: 'Create master data success',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll({ limit = 100, page = 1 }: BaseQueryParamsInterface) {
    try {
      const skip = (page - 1) * limit;

      const result = await this.prisma.masterData.findMany({
        skip,
        take: limit,
      });

      const total = await this.prisma.masterData.count();

      return {
        error: false,
        message: 'Get all master data success',
        data: result,
        meta: {
          total,
          page: Number(page),
          last_page: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.masterData.findUnique({
        where: { id },
      });

      if (!result) {
        throw new NotFoundException({
          error: false,
          message: `Master Data with id ${id} not found`,
        });
      }

      return {
        error: false,
        message: 'Get master data success',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByMasterCategoryCode(masterCategoryCode: string) {
    try {
      const result = await this.prisma.masterData.findMany({
        where: { masterCategoryCode },
      });

      return {
        error: false,
        message: 'Get master data success',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateMasterDatumDto: UpdateMasterDatumDto) {
    try {
      const masterCategory = await this.prisma.masterCategory.findUnique({
        where: { id: updateMasterDatumDto.masterCategoryId },
      });

      if (!masterCategory) {
        throw new NotFoundException({
          error: false,
          message: `Master Category with id ${updateMasterDatumDto.masterCategoryId} not found`,
        });
      }

      const masterCategoryCode = masterCategory.code;

      const result = await this.prisma.masterData.update({
        where: { id },
        data: {
          ...updateMasterDatumDto,
          masterCategoryCode,
        },
      });

      return {
        error: false,
        message: 'Update master data success',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.masterData.delete({
        where: { id },
      });

      return {
        error: false,
        message: 'Delete master data success',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
