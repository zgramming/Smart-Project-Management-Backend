import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { IProjectTaskHistoryFindByProjectIdQuery } from './query_param/project-task-history-find-by-project-id.query';

@Injectable()
export class ProjectTaskHistoryService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = new PrismaService();
  }

  async findByProjectTaskId(
    id: string,
    params?: IProjectTaskHistoryFindByProjectIdQuery,
  ) {
    try {
      const { limit = 100, page = 1 } = params || {};
      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectTaskHistory.findMany({
        take: limit,
        skip: offset,
        where: {
          projectTaskId: id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await this.prismaService.projectTaskHistory.count({
        where: {
          projectTaskId: id,
        },
      });
      return {
        error: false,
        message: `Project task history with project task id ${id} has been found`,
        total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
