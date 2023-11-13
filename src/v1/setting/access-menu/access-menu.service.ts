import { Injectable } from '@nestjs/common';
import { CreateAccessMenuDto } from './dto/create-access-menu.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessMenuService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAccessMenuDto: CreateAccessMenuDto) {
    try {
      const result = await this.prismaService.$transaction(async (trx) => {
        const getFirstRoleId = createAccessMenuDto.values[0].roleId;

        // Delete all data access menu by role id
        await trx.accessMenu.deleteMany({
          where: {
            roleId: getFirstRoleId,
          },
        });

        // Create new data access menu
        const createAccessMenu = createAccessMenuDto.values.map((item) => {
          return {
            roleId: item.roleId,
            menuId: item.menuId,
            modulId: item.modulId,
            allowedAccess: {
              set: item.allowedAccess,
            },
          };
        });

        const result = await trx.accessMenu.createMany({
          data: createAccessMenu,
        });

        return result;
      });

      return {
        error: false,
        message: 'Success create access menu',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll() {
    try {
      const result = await this.prismaService.accessMenu.findMany({
        include: {
          Menu: true,
          Modul: true,
          Role: true,
        },
      });

      return {
        error: false,
        message: 'Success get all access menu',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByRoleId(roleId: number) {
    try {
      const result = await this.prismaService.accessMenu.findMany({
        where: {
          roleId,
        },
        select: {
          id: true,
          menuId: true,
          modulId: true,
          roleId: true,
          allowedAccess: true,
          Modul: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          Menu: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      return {
        error: false,
        message: `Success get access menu by role id ${roleId}`,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
