import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { handlingCustomError } from 'src/utils/function';
import { IProjectFindAllQueryParam } from './query_param/project-findall.query';
import { roleCode } from 'src/utils/constant';
import { ProjectResumeDashboardOwnerQueryParam } from './query_param/project-resume-dashboard-owner.query';
import { ProjectResumeDashboardProjectManagerQueryParam } from './query_param/project-resume-dashboard-project-manager.query';
import { ProjectResumeDashboardDeveloperQueryParam } from './query_param/project-resume-dashboard-developer.query';

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
    // 6. New update from assigned task to you today

    const now = new Date();
    const nowPlusOneMonth = new Date(new Date().setMonth(now.getMonth() + 1));
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

    // Find New update assigned task from developer to you today
    const todayOnlyYearMonth = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    );

    // Top 5 Update assign task from developer to you today will be shown
    const newUpdateFromAssignedTaskToYouToday =
      await this.prismaService.projectTask.findMany({
        take: 5,
        where: {
          createdBy: userId,
          updatedBy: {
            not: userId,
          },
          updatedAt: {
            gte: todayOnlyYearMonth,
          },
        },
        orderBy: {
          updatedAt: 'asc',
        },
        select: {
          id: true,
          name: true,
          description: true,
          degreeOfDifficulty: true,
          startDate: true,
          endDate: true,
          status: true,
          Project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

    // Get running SQL query previous function

    return {
      error: false,
      message: 'Statistic retrieved successfully',
      data: {
        totalProject,
        totalDocument,
        totalMeeting,
        totalTask,
        projectsWillBeEndSoon,
        newUpdateFromAssignedTaskToYouToday,
      },
    };
  }

  async getResumeDashboardDeveloper(
    userId: number,
    params?: ProjectResumeDashboardDeveloperQueryParam,
  ) {
    // 1. Total Project
    // 1.1. Total Project ACTIVE
    // 1.2. Total Project INACTIVE
    // 1.3. Total Project SUSPEND
    // 1.4. Total Project FINISH
    // 2. Total Meeting
    // 3. Total Task
    // 3.1. Total Task Status FINISH
    // 3.2. Total Task Status PENDING
    // 3.3. Total Task Status ON_PROGRESS
    // 3.4. Total Task Status NEED HELP
    // 3.5. Total Task Status CANCEL
    // 3.6. Total Task Difficulty EASY
    // 3.7. Total Task Difficulty MEDIUM
    // 3.8. Total Task Difficulty HARD
    // 3.9. Total Task Difficulty VERY HARD
    // 4. Total Client you have worked with
    // 5. Meeting will be held in the next 7 days
    // 6. New Task assigned to you

    const now = new Date();
    const nowPlusSevenDays = new Date(new Date().setDate(now.getDate() + 7));
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

    const totalProjectActive = await this.prismaService.project.count({
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        status: 'ACTIVE',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalProjectInactive = await this.prismaService.project.count({
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        status: 'INACTIVE',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalProjectSuspend = await this.prismaService.project.count({
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        status: 'SUSPEND',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalProjectFinish = await this.prismaService.project.count({
      where: {
        ProjectMember: {
          some: {
            userId: userId,
          },
        },
        status: 'FINISH',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalMeeting = await this.prismaService.projectMeeting.count({
      where: {
        ProjectMeetingMember: {
          some: {
            userId: userId,
          },
        },
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
        startDate: {
          gte: now,
          lte: nowPlusSevenDays,
        },
      },
    });

    const totalTask = await this.prismaService.projectTask.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskStatusFinish = await this.prismaService.projectTask.count({
      where: {
        userId,
        status: 'FINISH',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskStatusPending = await this.prismaService.projectTask.count({
      where: {
        userId,
        status: 'PENDING',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskStatusInProgress =
      await this.prismaService.projectTask.count({
        where: {
          userId,
          status: 'ON_PROGRESS',
          createdAt: {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          },
        },
      });

    const totalTaskStatusNeedHelp = await this.prismaService.projectTask.count({
      where: {
        userId,
        status: 'NEED_HELP',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskStatusCancel = await this.prismaService.projectTask.count({
      where: {
        userId,
        status: 'CANCEL',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskDifficultyEasy = await this.prismaService.projectTask.count({
      where: {
        userId,
        degreeOfDifficulty: 'EASY',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskDifficultyMedium =
      await this.prismaService.projectTask.count({
        where: {
          userId,
          degreeOfDifficulty: 'MEDIUM',
          createdAt: {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          },
        },
      });

    const totalTaskDifficultyHard = await this.prismaService.projectTask.count({
      where: {
        userId,
        degreeOfDifficulty: 'HARD',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const totalTaskDifficultyVeryHard =
      await this.prismaService.projectTask.count({
        where: {
          userId,
          degreeOfDifficulty: 'VERY_HARD',
          createdAt: {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          },
        },
      });

    const totalClient = await this.prismaService.projectClient.count({
      where: {
        Project: {
          some: {
            ProjectMember: {
              some: {
                userId,
              },
            },
          },
        },
      },
    });

    const meetingWillBeHeld = await this.prismaService.projectMeeting.findMany({
      take: 5,
      where: {
        ProjectMeetingMember: {
          some: {
            userId: userId,
          },
        },
        startDate: {
          gte: now,
          lte: nowPlusSevenDays,
        },
      },
      orderBy: {
        startDate: 'asc',
      },

      select: {
        id: true,
        name: true,
        projectId: true,
        method: true,
        link: true,
        startDate: true,
        endDate: true,
        status: true,

        Project: {
          select: {
            id: true,
            name: true,
            code: true,
            ProjectClient: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    // Top 5 Task with status PENDING and CREATED_AT is today will be shown
    const todayOnlyYearMonth = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    );
    const newTaskAssignedToYou = await this.prismaService.projectTask.findMany({
      take: 5,
      where: {
        userId,
        status: 'PENDING',
        createdAt: {
          gte: todayOnlyYearMonth,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        degreeOfDifficulty: true,
        startDate: true,
        endDate: true,
        status: true,
        Project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      error: false,
      message: 'Statistic retrieved successfully',
      data: {
        totalProject,
        totalProjectActive,
        totalProjectInactive,
        totalProjectSuspend,
        totalProjectFinish,
        totalMeeting,
        totalTask,
        totalTaskStatusFinish,
        totalTaskStatusPending,
        totalTaskStatusInProgress,
        totalTaskStatusNeedHelp,
        totalTaskStatusCancel,
        totalTaskDifficultyEasy,
        totalTaskDifficultyMedium,
        totalTaskDifficultyHard,
        totalTaskDifficultyVeryHard,
        totalClient,
        meetingWillBeHeld,
        newTaskAssignedToYou,
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
