import { Injectable } from '@nestjs/common';
import { CreateAccessModulDto } from './dto/create-access-modul.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessModulService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccessModulDto: CreateAccessModulDto) {
    try {
      // Prisma Start Transaction
      const result = await this.prisma.$transaction(async (trx) => {
        const getFirstRoleId = createAccessModulDto.values[0].roleId;

        // Delete all data in table access_modul first
        await trx.accessModul.deleteMany({
          where: {
            roleId: getFirstRoleId,
          },
        });
        // Create new data
        const data = createAccessModulDto.values.map((item) => ({
          roleId: item.roleId,
          modulId: item.modulId,
        }));

        const result = await trx.accessModul.createMany({
          data,
        });

        return result;
      });

      return {
        error: false,
        message: 'Data has been created',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.accessModul.findMany({
        include: {
          Modul: true,
          Role: true,
        },
      });

      return {
        error: false,
        message: 'Access Modul Retrieved Successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.accessModul.findUnique({
        where: {
          id,
        },
        include: {
          Modul: true,
          Role: true,
        },
      });

      return {
        error: false,
        message: 'Access Modul Retrieved Successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByRoleId(roleId: number) {
    try {
      const result = await this.prisma.accessModul.findMany({
        where: {
          roleId,
        },
        include: {
          Modul: true,
          Role: true,
        },
      });

      return {
        error: false,
        message: 'Access Modul Retrieved Successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async removeByRoleId(roleId: number) {
    try {
      const result = await this.prisma.accessModul.deleteMany({
        where: {
          roleId,
        },
      });

      return {
        error: false,
        message: 'Access Modul Deleted Successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async removeAll() {
    try {
      const result = await this.prisma.accessModul.deleteMany({});

      return {
        error: false,
        message: 'Access Modul Deleted Successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
