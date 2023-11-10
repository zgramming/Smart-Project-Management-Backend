import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectMeetingDto } from './dto/create-project-meeting.dto';
import { UpdateProjectMeetingDto } from './dto/update-project-meeting.dto';
import { handlingCustomError } from 'src/utils/function';
import { PrismaService } from 'src/prisma.service';
import { IProjectMeetingFindAllQuery } from './query_param/project-meeting-findall.query';

@Injectable()
export class ProjectMeetingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectMeetingDto: CreateProjectMeetingDto) {
    try {
      const result = await this.prismaService.projectMeeting.create({
        data: {
          projectId: createProjectMeetingDto.projectId,
          name: createProjectMeetingDto.name,
          link: createProjectMeetingDto.link,
          method: createProjectMeetingDto.method,
          description: createProjectMeetingDto.description,
          status: createProjectMeetingDto.status,
          startDate: new Date(createProjectMeetingDto.startDate),
          endDate: new Date(createProjectMeetingDto.endDate),
          createdBy: createProjectMeetingDto.createdBy,
          ProjectMeetingMember: {
            createMany: {
              data: createProjectMeetingDto.members,
            },
          },
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

  async findAll(params?: IProjectMeetingFindAllQuery) {
    try {
      const {
        page = 1,
        limit = 100,
        name,
        projectId,
        // startDate,
        // endDate,
        method,
      } = params;

      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectMeeting.findMany({
        take: limit,
        skip: offset,
        where: {
          name: {
            mode: 'insensitive',
            contains: name,
          },
          projectId: projectId,
          method: method,
        },
        include: {
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          ProjectMeetingMember: {
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  roleId: true,
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const total = await this.prismaService.projectMeeting.count({
        where: {
          name: {
            mode: 'insensitive',
            contains: name,
          },
          projectId: projectId,
          method: method,
        },
      });

      return {
        message: 'ProjectMeeting found successfully',
        error: false,
        data: result,
        total: total,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async findAllByMe(userId: number, params?: IProjectMeetingFindAllQuery) {
    try {
      const {
        page = 1,
        limit = 100,
        name,
        projectId,
        // startDate,
        // endDate,
        method,
      } = params;

      const offset = (page - 1) * limit;

      const result = await this.prismaService.projectMeeting.findMany({
        take: limit,
        skip: offset,
        where: {
          ProjectMeetingMember: {
            some: {
              userId: userId,
            },
          },
          name: {
            mode: 'insensitive',
            contains: name,
          },
          projectId: projectId,
          method: method,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          ProjectMeetingMember: {
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  roleId: true,
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const total = await this.prismaService.projectMeeting.count({
        where: {
          ProjectMeetingMember: {
            some: {
              userId: userId,
            },
          },
          name: {
            mode: 'insensitive',
            contains: name,
          },
          projectId: projectId,
          method: method,
        },
      });

      return {
        message: 'Project found successfully',
        error: false,
        total: total,
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
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          ProjectMeetingMember: {
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  roleId: true,
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
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

  async findByUser(userId: number) {
    try {
      const result = await this.prismaService.projectMeeting.findMany({
        where: {
          ProjectMeetingMember: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          Project: {
            select: {
              id: true,
              name: true,
              clientId: true,
              ProjectClient: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          ProjectMeetingMember: {
            select: {
              id: true,
              userId: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  roleId: true,
                  role: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
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

  async update(id: string, updateProjectMeetingDto: UpdateProjectMeetingDto) {
    try {
      const result = await this.prismaService.$transaction(async () => {
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

        const updateMeeting = await this.prismaService.projectMeeting.update({
          where: {
            id: id,
          },
          data: {
            description: updateProjectMeetingDto.description,
            link: updateProjectMeetingDto.link,
            name: updateProjectMeetingDto.name,
            projectId: updateProjectMeetingDto.projectId,
            status: updateProjectMeetingDto.status,
            method: updateProjectMeetingDto.method,
            startDate: new Date(updateProjectMeetingDto.startDate),
            endDate: new Date(updateProjectMeetingDto.endDate),
            ProjectMeetingMember: {
              deleteMany: {
                projectMeetingId: id,
              },
              createMany: {
                data: updateProjectMeetingDto.members,
              },
            },
          },
        });

        return updateMeeting;
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
