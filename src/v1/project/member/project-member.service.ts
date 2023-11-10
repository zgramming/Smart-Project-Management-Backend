import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class ProjectMemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectMember.findMany({
        take: limit,
        skip: offset,
      });

      return {
        message: 'ProjectMembers retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
