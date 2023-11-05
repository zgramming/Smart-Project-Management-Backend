import { Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

@Injectable()
export class ProjectMemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectMemberDto: CreateProjectMemberDto) {
    try {
      const result = await this.prismaService.$transaction(async (trx) => {
        // Remove All ProjectMember by ProjectId
        await trx.projectMember.deleteMany({
          where: {
            projectId: createProjectMemberDto.members[0].projectId,
          },
        });

        // Create New ProjectMember
        const result = await trx.projectMember.createMany({
          data: createProjectMemberDto.members,
        });

        return result;
      });

      return {
        message: 'ProjectMember created successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

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
