import { Injectable, NotFoundException } from '@nestjs/common';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectMeetingMemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params?: BaseQueryParamsInterface) {
    try {
      const limit = params?.limit || 10;
      const page = params?.page || 1;

      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectMeetingMember.findMany({
        take: limit,
        skip: offset,
      });

      return {
        status: 'success',
        message: 'Meeting member successfully retrieved',
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const meetingMember =
        await this.prismaService.projectMeetingMember.findUnique({
          where: { id: id },
        });

      if (!meetingMember) {
        throw new NotFoundException({
          error: true,
          message: 'Meeting member not found',
        });
      }

      return {
        status: 'success',
        message: 'Meeting member successfully retrieved',
        data: meetingMember,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
