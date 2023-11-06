import { Injectable } from '@nestjs/common';
import { CreateAccessCategoryModulDto } from './dto/create-access-category-modul.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccessCategoryModulService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccessCategoryModulDto: CreateAccessCategoryModulDto) {
    try {
      const { values } = createAccessCategoryModulDto;
      const roleId = values[0].roleId;

      const result = await this.prisma.$transaction(async () => {
        // Delete all access category modul by role id
        await this.prisma.accessCategoryModul.deleteMany({
          where: {
            roleId,
          },
        });

        // Create new access category modul
        const result = await this.prisma.accessCategoryModul.createMany({
          data: values,
        });

        return result;
      });

      return {
        message: 'Success create access category modul',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByRoleId(roleId: number) {
    try {
      const result = await this.prisma.accessCategoryModul.findMany({
        where: {
          roleId,
        },
        include: {
          Role: true,
          CategoryModul: {
            select: {
              id: true,
              name: true,
              code: true,
              AccessModul: {
                where: {
                  roleId,
                },
                select: {
                  id: true,
                  modulId: true,
                  roleId: true,
                  Modul: {
                    select: {
                      id: true,
                      name: true,
                      code: true,
                      AccessMenu: {
                        where: {
                          roleId,
                        },
                        select: {
                          id: true,
                          menuId: true,
                          roleId: true,
                          allowedAccess: true,
                          Menu: {
                            select: {
                              id: true,
                              name: true,
                              code: true,
                              prefix: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return {
        message: 'Success get access category modul',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
