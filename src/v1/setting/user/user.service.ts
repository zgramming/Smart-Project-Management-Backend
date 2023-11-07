import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { encryptPassword, handlingCustomError } from 'src/utils/function';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { roleId, name, username, email, password, status } = createUserDto;
      const result = await this.prisma.user.create({
        data: {
          roleId,
          name,
          username,
          email,
          password: await encryptPassword(password),
          status,
        },
      });

      return {
        error: false,
        message: 'User created successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const page = params.page ?? 1;
      const limit = params.limit ?? 100;

      const result = await this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        error: false,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          roleId: true,
          name: true,
          username: true,
          role: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      if (!result) {
        throw new NotFoundException({
          error: true,
          message: 'User not found',
          data: null,
        });
      }

      return {
        error: false,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOnlyDeveloperAndProyekManager() {
    try {
      const role = await this.prisma.role.findMany({
        where: {
          code: { in: ['DEVELOPER', 'PROYEK_MANAGER'] },
        },
      });
      const roleIds = role.map((item) => item.id);
      const result = await this.prisma.user.findMany({
        where: {
          roleId: {
            in: roleIds,
          },
        },
        select: {
          id: true,
          name: true,
          roleId: true,
          role: {
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
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException({
          error: true,
          message: 'User not found',
          data: null,
        });
      }

      const { roleId, name, username, email, password, status } = updateUserDto;
      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          roleId,
          name,
          username,
          email,
          password,
          status,
        },
      });

      return {
        error: false,
        message: 'User updated successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException({
          error: true,
          message: 'User not found',
          data: null,
        });
      }

      const result = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return {
        error: false,
        message: 'User deleted successfully',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
