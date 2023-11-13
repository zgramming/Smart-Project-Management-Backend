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
          categoryModulId: item.categoryModulId,
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

  async findByRoleId(roleId: number) {
    try {
      const result = await this.prisma.accessModul.findMany({
        where: {
          roleId,
        },
        include: {
          Modul: {
            include: {
              Menu: true,
            },
          },
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

  async findSelectedAndUnselectedAccessByRole(roleId: number) {
    try {
      const getSelectedAccessCategoryModul =
        await this.prisma.accessCategoryModul.findMany({
          where: {
            roleId,
          },
          select: {
            categoryModulId: true,
          },
        });

      const getModulByCategoryModulId = await this.prisma.modul.findMany({
        where: {
          categoryModulId: {
            in: getSelectedAccessCategoryModul.map(
              (item) => item.categoryModulId,
            ),
          },
        },
      });

      const getSelectedAccess = await this.prisma.accessModul.findMany({
        where: {
          roleId,
        },
        include: {
          Modul: true,
        },
      });

      const getUnselectedAccess = getModulByCategoryModulId.filter(
        (item) =>
          !getSelectedAccess.map((item) => item.modulId).includes(item.id),
      );

      const mappingSelectedAccess = getSelectedAccess.map((item) => ({
        categoryModulId: item.categoryModulId,
        modulId: item.modulId,
        name: item.Modul.name,
        code: item.Modul.code,
      }));

      const mappingUnselectedAccess = getUnselectedAccess.map((item) => ({
        categoryModulId: item.categoryModulId,
        modulId: item.id,
        name: item.name,
        code: item.code,
      }));

      return {
        error: false,
        message: 'Access Modul Retrieved Successfully',
        data: {
          selected: mappingSelectedAccess,
          unselected: mappingUnselectedAccess,
        },
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
