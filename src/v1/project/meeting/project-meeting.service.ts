import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectMeetingDto } from './dto/create-project-meeting.dto';
import { UpdateProjectMeetingDto } from './dto/update-project-meeting.dto';
import { handlingCustomError } from 'src/utils/function';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectMeetingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectMeetingDto: CreateProjectMeetingDto) {
    try {
      const result = await this.prismaService.projectMeeting.create({
        data: {
          ...createProjectMeetingDto,
          startDate: new Date(createProjectMeetingDto.startDate),
          endDate: new Date(createProjectMeetingDto.endDate),
        },
      });

      return {
        message: 'ProjectMeeting created successfully',
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

      const result = await this.prismaService.projectMeeting.findMany({
        take: limit,
        skip: offset,
        include: {
          Project: true,
          ProjectMeetingMember: {
            include: {
              User: true,
            },
          },
        },
      });

      return {
        message: 'ProjectMeeting found successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.projectMeeting.findUnique({
        where: {
          id: id,
        },
        include: {
          Project: true,
          ProjectMeetingMember: {
            include: {
              User: true,
            },
          },
        },
      });

      if (!result) {
        throw new NotFoundException({
          message: 'ProjectMeeting not found',
          error: true,
        });
      }

      return {
        message: 'ProjectMeeting found successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: string, updateProjectMeetingDto: UpdateProjectMeetingDto) {
    try {
      const meeting = await this.prismaService.projectMeeting.findUnique({
        where: {
          id: id,
        },
      });

      if (!meeting) {
        throw new NotFoundException({
          message: 'ProjectMeeting not found',
          error: true,
        });
      }

      const result = await this.prismaService.projectMeeting.update({
        where: {
          id: id,
        },
        data: {
          ...updateProjectMeetingDto,
          startDate: new Date(updateProjectMeetingDto.startDate),
          endDate: new Date(updateProjectMeetingDto.endDate),
        },
      });

      return {
        message: 'ProjectMeeting updated successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: string) {
    try {
      const meeting = await this.prismaService.projectMeeting.findUnique({
        where: {
          id: id,
        },
      });

      if (!meeting) {
        throw new NotFoundException({
          message: 'ProjectMeeting not found',
          error: true,
        });
      }

      const result = await this.prismaService.projectMeeting.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'ProjectMeeting deleted successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
