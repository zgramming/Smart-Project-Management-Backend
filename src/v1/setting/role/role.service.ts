import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { ActiveStatusEnum } from '@prisma/client';
import { IRolesFindAllQueryParams } from './query-param/role-findall.query';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const result = await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        code: createRoleDto.code,
        description: createRoleDto.description,
        status: createRoleDto.status as unknown as ActiveStatusEnum,
      },
    });

    return {
      message: 'Role created successfully',
      error: false,
      data: result,
    };
  }

  async findAll(params?: IRolesFindAllQueryParams) {
    const page = params?.page || 1;
    const limit = params?.limit || 100;
    const name = params?.name;

    const offset = (page - 1) * limit;
    const result = await this.prisma.role.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: offset,
    });
    const total = await this.prisma.role.count();

    return {
      message: 'Roles retrieved successfully',
      error: false,
      total,
      data: result,
    };
  }

  async findByCode(code: string) {
    const result = await this.prisma.role.findUnique({
      where: {
        code,
      },
    });

    return {
      message: 'Role retrieved successfully',
      error: false,
      data: result,
    };
  }

  async findOne(id: number) {
    const result = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    return {
      message: 'Role retrieved successfully',
      error: false,
      data: result,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const result = await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: updateRoleDto.name,
        code: updateRoleDto.code,
        description: updateRoleDto.description,
        status: updateRoleDto.status as unknown as ActiveStatusEnum,
      },
    });

    return {
      message: 'Role updated successfully',
      error: false,
      data: result,
    };
  }

  async remove(id: number) {
    const result = await this.prisma.role.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Role deleted successfully',
      error: false,
      data: result,
    };
  }
}
