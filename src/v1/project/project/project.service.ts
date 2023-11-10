import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { IProjectFindAllQueryParam } from './query_param/project-findall.query';
import { roleCode } from 'src/utils/constant';
import { ProjectResumeDashboardOwnerQueryParam } from './query_param/project-resume-dashboard-owner.query';
import { ProjectResumeDashboardProjectManagerQueryParam } from './query_param/project-resume-dashboard-project-manager.query';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const result = await this.prismaService.project.create({
        data: {
          createdBy: createProjectDto.createdBy,
          clientId: createProjectDto.clientId,
          name: createProjectDto.name,
          code: createProjectDto.code,
          status: createProjectDto.status,
          startDate: new Date(createProjectDto.startDate),
          endDate: new Date(createProjectDto.endDate),
          ProjectMember: {
            createMany: {
              data: createProjectDto.members.map((value) => ({
                userId: value.userId,
                createdBy: value.createdBy,
              })),
            },
          },
        },
      });

      return {
        message: 'Project created successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAll(params?: IProjectFindAllQueryParam) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const name = params?.name;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.project.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: offset,
        include: {
          ProjectClient: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          ProjectMember: {
            select: {
              id: true,
              userId: true,
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      const total = await this.prismaService.project.count();

      return {
        message: 'Projects retrieved successfully',
        error: false,
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async getResumeDashboardOwner(
    params?: ProjectResumeDashboardOwnerQueryParam,
  ) {
    // 1. Total User Developer
    // 2. Total User Project Manager
    // 3. Total Project
    // 4. Total Client
    // 5. Total Document
    // 6. Total Meeting
    // 7. Total Task

    const year = params?.year || new Date().getFullYear();

    const totalUserDeveloper = await this.prismaService.user.count({
      where: {
        role: { code: roleCode.developer },
      },
    });

    const totalUserProjectManager = await this.prismaService.user.count({
      where: {
        role: { code: roleCode.projectManager },
      },
    });

    const totalProject = await this.prismaService.project.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalClient = await this.prismaService.projectClient.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalDocument = await this.prismaService.projectDocument.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalMeeting = await this.prismaService.projectMeeting.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTask = await this.prismaService.projectTask.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const statisticDeveloper = await this.prismaService.user.findMany({
      take: 5,
      where: {
        role: { code: roleCode.developer },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            ProjectMember: true,
            ProjectTask: true,
          },
        },
      },
    });

    const mappingStatisticDeveloper = statisticDeveloper.map((value) => ({
      id: value.id,
      name: value.name,
      totalTask: value._count.ProjectTask,
      totalProject: value._count.ProjectMember,
    }));

    const statisticProjectManager = await this.prismaService.user.findMany({
      take: 5,
      where: {
        role: { code: roleCode.projectManager },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            ProjectMember: true,
            ProjectMeetingMember: true,
          },
        },
      },
    });

    const mappingStatisticProjectManager = statisticProjectManager.map(
      (value) => ({
        id: value.id,
        name: value.name,
        totalProject: value._count.ProjectMember,
        totalMeeting: value._count.ProjectMeetingMember,
      }),
    );

    const recentProject = await this.prismaService.project.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        ProjectClient: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        ProjectMember: {
          select: {
            id: true,
            userId: true,
            User: { select: { id: true, name: true } },
          },
        },
      },
    });

    return {
      error: false,
      message: 'Statistic retrieved successfully',
      data: {
        totalUserDeveloper: totalUserDeveloper,
        totalUserProjectManager: totalUserProjectManager,
        totalProject: totalProject,
        totalClient: totalClient,
        totalDocument: totalDocument,
        totalMeeting: totalMeeting,
        totalTask: totalTask,
        statisticDeveloper: mappingStatisticDeveloper,
        statisticProjectManager: mappingStatisticProjectManager,
        recentProject: recentProject,
      },
    };
  }

  async getResumeDashboardProjectManager(
    userId: number,
    params?: ProjectResumeDashboardProjectManagerQueryParam,
  ) {
    // 1. Total Project
    // 2. Total Document
    // 3. Total Meeting
    // 4. Total Task
    // 5. Top 5 Project will be end soon

    const year = params?.year || new Date().getFullYear();

    const totalProject = await this.prismaService.project.count({
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalDocument = await this.prismaService.projectDocument.count({
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalMeeting = await this.prismaService.projectMeeting.count({
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTask = await this.prismaService.projectTask.count({
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    // Find Top 5 Project will be end soon 1 month after today
    const now = new Date();
    const nowPlusOneMonth = new Date(new Date().setMonth(now.getMonth() + 1));
    const projectsWillBeEndSoon = await this.prismaService.project.findMany({
      take: 5,
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        endDate: {
          gte: now,
          lte: nowPlusOneMonth,
        },
      },
      orderBy: {
        endDate: 'asc',
      },
    });

    return {
      error: false,
      message: 'Statistic retrieved successfully',
      data: {
        totalProject: totalProject,
        totalDocument: totalDocument,
        totalMeeting: totalMeeting,
        totalTask: totalTask,
        projectsWillBeEndSoon: projectsWillBeEndSoon,
      },
    };
  }

  async findAllByMe(idUser: number, params?: IProjectFindAllQueryParam) {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 100;
      const name = params?.name;

      const offset = (page - 1) * limit;
      const result = await this.prismaService.project.findMany({
        take: limit,
        skip: offset,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
          ProjectMember: {
            some: {
              userId: idUser,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          ProjectClient: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          ProjectMember: {
            select: {
              id: true,
              userId: true,
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      const total = await this.prismaService.project.count({
        where: {
          ProjectMember: {
            some: {
              userId: idUser,
            },
          },
        },
      });

      return {
        message: 'Projects retrieved successfully',
        error: false,
        total: total,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prismaService.project.findUnique({
        where: { id: id },
        include: {
          ProjectClient: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          ProjectMember: {
            select: {
              id: true,
              userId: true,
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      return {
        message: 'Project retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findByCode(code: string) {
    try {
      const result = await this.prismaService.project.findUnique({
        where: { code: code },
        include: {
          ProjectMember: {
            include: {
              User: { select: { id: true, name: true } },
            },
          },
        },
      });

      return {
        message: 'Project retrieved successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const result = await this.prismaService.$transaction(async (trx) => {
        const project = await trx.project.findUnique({
          where: { id: id },
        });

        if (!project) {
          throw new NotFoundException({
            error: true,
            message: `Project with id ${id} not found`,
          });
        }

        // Update Project
        const update = await trx.project.update({
          where: { id: id },
          data: {
            clientId: updateProjectDto.clientId,
            name: updateProjectDto.name,
            code: updateProjectDto.code,
            status: updateProjectDto.status,
            startDate: new Date(updateProjectDto.startDate),
            endDate: new Date(updateProjectDto.endDate),
          },
        });

        // Update ProjectMember
        await trx.projectMember.deleteMany({
          where: { projectId: project.id },
        });

        // Create New ProjectMember
        await trx.projectMember.createMany({
          data: updateProjectDto.members.map((value) => ({
            projectId: id,
            userId: value.userId,
            status: value.status,
            createdBy: value.createdBy,
          })),
        });

        return update;
      });

      return {
        message: 'Project updated successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async remove(id: number) {
    try {
      const project = await this.prismaService.project.findUnique({
        where: { id: id },
      });

      if (!project) {
        throw new NotFoundException({
          error: true,
          message: `Project with id ${id} not found`,
        });
      }

      const result = await this.prismaService.project.delete({
        where: { id: id },
      });

      return {
        message: 'Project deleted successfully',
        error: false,
        data: result,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }
}
