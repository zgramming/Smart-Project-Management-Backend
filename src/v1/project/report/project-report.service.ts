import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { pathReportExcel, roleCode } from 'src/utils/constant';
import { handlingCustomError } from 'src/utils/function';
import { ProjectReportGenerateOwnerQueryParam } from './query-param/project-report-generate-owner.query';
import { ProjectReportGenerateDeveloperQueryParam } from './query-param/project-report-generate-developer.query';
import { ProjectReportGenerateProjectManagerQueryParam } from './query-param/project-report-generate-project-manager.query copy 2';

interface CreateTableExcelProps {
  worksheetName?: string;
  worksheetTableName?: string;
  // Dont use space for displayName, it will throw warning when opening the file. Please see this issue in https://github.com/exceljs/exceljs/issues/106
  worksheetTableDisplayName?: string;
  // Dont include extension inside filename, it already set to .xlsx
  filename?: string;
  columns: ExcelJS.TableColumnProperties[];
  rows: any[][];
}

@Injectable()
export class ProjectReportService {
  constructor(private readonly prismaService: PrismaService) {}

  private async createTableExcel({
    columns,
    rows,
    filename,
    worksheetName = 'sheet1',
    worksheetTableName = 'MyTable',
    worksheetTableDisplayName = 'report',
  }: CreateTableExcelProps) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Zeffry Reynando';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastModifiedBy = 'Zeffry Reynando';
    workbook.lastPrinted = new Date();

    const worksheet = workbook.addWorksheet(worksheetName);

    worksheet.addTable({
      name: worksheetTableName,
      ref: 'A1',
      headerRow: true,
      displayName: worksheetTableDisplayName,
      // style: {
      //   showColumnStripes: true,
      //   showFirstColumn: true,
      //   showLastColumn: true,
      //   showRowStripes: true,
      //   theme: 'TableStyleLight1',
      // },
      columns: columns,
      rows: rows,
    });

    const now = new Date();
    const nowAsString = now.toISOString().replace(/:/g, '-');
    const generateFilename = filename || `report-${nowAsString}`;
    const fullPath = `${pathReportExcel}/${generateFilename}.xlsx`;
    const isDirExist = fs.existsSync(pathReportExcel);

    if (!isDirExist) {
      fs.mkdirSync(pathReportExcel, { recursive: true });
    }

    await workbook.xlsx.writeFile(fullPath);

    return fullPath;
  }

  async findAll() {
    try {
      const pathExcel = await this.createTableExcel({
        columns: [
          { name: 'No', filterButton: true },
          { name: 'Client', filterButton: true },
          { name: 'Project', filterButton: true },
          { name: 'Name', filterButton: true },
          { name: 'Start Date', filterButton: true },
          { name: 'End Date', filterButton: true },
          { name: 'Status', filterButton: true },
        ],
        rows: [
          [
            1,
            'Client 1',
            'Project 1',
            'Name 1',
            '2021-01-01',
            '2021-01-01',
            'Status 1',
          ],
          [
            2,
            'Client 2',
            'Project 2',
            'Name 2',
            '2021-01-01',
            '2021-01-01',
            'Status 2',
          ],
          [
            3,
            'Client 3',
            'Project 3',
            'Name 3',
            '2021-01-01',
            '2021-01-01',
            'Status 3',
          ],
          [
            4,
            'Client 4',
            'Project 4',
            'Name 4',
            '2021-01-01',
            '2021-01-01',
            'Status 4',
          ],
          [
            5,
            'Client 5',
            'Project 5',
            'Name 5',
            '2021-01-01',
            '2021-01-01',
            'Status 5',
          ],
        ],
      });
      return {
        error: false,
        message: 'Success',
        data: pathExcel,
      };
    } catch (error) {
      return handlingCustomError(error);
    }
  }

  async generateReportProjectManager(
    userId: number,
    params?: ProjectReportGenerateProjectManagerQueryParam,
  ) {
    const year = params?.year || new Date().getFullYear();
    const workbook = new ExcelJS.Workbook();

    const sheetProject = workbook.addWorksheet('Project i am in');

    const projects = await this.prismaService.project.findMany({
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

    const isProjectsEmpty = projects.length === 0;
    const emptyArray = [['', '', '', '', '', '']];

    sheetProject.addTable({
      name: 'projectTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Project',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Code', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isProjectsEmpty
        ? // We need to add empty array if there is no data, because it will throw error if we dont add empty array
          emptyArray
        : [
            ...projects.map((project, index) => [
              index + 1,
              project.name,
              project.code,
              project.status,
              project.createdAt,
              project.updatedAt,
            ]),
          ],
    });

    const sheetDocument = workbook.addWorksheet('Document Created By Me');

    const documents = await this.prismaService.projectDocument.findMany({
      include: {
        Project: true,
      },
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });
    const isDocumentsEmpty = documents.length === 0;
    const emptyArrayDocument = [['', '', '', '', '', '', '']];
    sheetDocument.addTable({
      name: 'documentTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Document',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Description', filterButton: true },
        { name: 'File', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isDocumentsEmpty
        ? emptyArrayDocument
        : [
            ...documents.map((document, index) => [
              index + 1,
              document.Project.name,
              document.name,
              document.description,
              document.file,
              document.createdAt,
              document.updatedAt,
            ]),
          ],
    });

    const sheetMeeting = workbook.addWorksheet('Meeting Created By Me');

    const meetings = await this.prismaService.projectMeeting.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
      },
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });
    const isMeetingsEmpty = meetings.length === 0;
    const emptyArrayMeeting = [['', '', '', '', '', '', '']];
    sheetMeeting.addTable({
      name: 'meetingTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Meeting',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Description', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isMeetingsEmpty
        ? emptyArrayMeeting
        : [
            ...meetings.map((meeting, index) => [
              index + 1,
              meeting.Project.ProjectClient.name,
              meeting.Project.name,
              meeting.name,
              meeting.description,
              meeting.createdAt,
              meeting.updatedAt,
            ]),
          ],
    });

    const sheetTask = workbook.addWorksheet('Task Created By Me');

    const tasks = await this.prismaService.projectTask.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
        User: true,
      },
      where: {
        createdBy: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isTasksEmpty = tasks.length === 0;
    const emptyArrayTask = [['', '', '', '', '', '', '', '', '', '', '']];

    sheetTask.addTable({
      name: 'taskTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Task',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Assign To', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Start Date', filterButton: true },
        { name: 'End Date', filterButton: true },
        { name: 'Difficulty', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isTasksEmpty
        ? emptyArrayTask
        : [
            ...tasks.map((task, index) => [
              index + 1,
              task.Project.ProjectClient.name,
              task.Project.name,
              task.User.name,
              task.name,
              task.startDate,
              task.endDate,
              task.degreeOfDifficulty,
              task.status,
              task.createdAt,
              task.updatedAt,
            ]),
          ],
    });

    const ext = '.xlsx';
    const now = new Date();
    const nowAsString = now.toISOString().replace(/:/g, '-');
    const generateFilename = `report-project-manager-${nowAsString}${ext}`;
    const fullPath = `${pathReportExcel}/${generateFilename}`;
    const isDirExist = fs.existsSync(pathReportExcel);

    if (!isDirExist) {
      fs.mkdirSync(pathReportExcel, { recursive: true });
    }

    await workbook.xlsx.writeFile(fullPath);
    const mappingFullPath = `${process.cwd()}/${fullPath}`;
    return {
      error: false,
      message: 'Success generate report project manager excel',
      name: generateFilename,
      relativePath: fullPath,
      fullPath: mappingFullPath,
    };
  }

  async generateReportDeveloper(
    userId: number,
    params?: ProjectReportGenerateDeveloperQueryParam,
  ) {
    const year = params?.year || new Date().getFullYear();
    const workbook = new ExcelJS.Workbook();

    const sheetTask = workbook.addWorksheet('Task Assigned To Me');

    const tasks = await this.prismaService.projectTask.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
        User: true,
      },
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isTasksEmpty = tasks.length === 0;
    const emptyArrayTask = [['', '', '', '', '', '', '', '', '', '', '']];

    sheetTask.addTable({
      name: 'taskTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Task',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Assign To', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Start Date', filterButton: true },
        { name: 'End Date', filterButton: true },
        { name: 'Difficulty', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isTasksEmpty
        ? emptyArrayTask
        : [
            ...tasks.map((task, index) => [
              index + 1,
              task.Project.ProjectClient.name,
              task.Project.name,
              task.User.name,
              task.name,
              task.startDate,
              task.endDate,
              task.degreeOfDifficulty,
              task.status,
              task.createdAt,
              task.updatedAt,
            ]),
          ],
    });

    const sheetProject = workbook.addWorksheet('Project i am in');

    const projects = await this.prismaService.project.findMany({
      include: {
        ProjectClient: true,
      },
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

    const isProjectsEmpty = projects.length === 0;
    const emptyArray = [['', '', '', '', '', '']];
    sheetProject.addTable({
      name: 'projectTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Project',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Code', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isProjectsEmpty
        ? // We need to add empty array if there is no data, because it will throw error if we dont add empty array
          emptyArray
        : [
            ...projects.map((project, index) => [
              index + 1,
              project.ProjectClient.name,
              project.name,
              project.code,
              project.status,
              project.createdAt,
              project.updatedAt,
            ]),
          ],
    });

    const sheetMeeting = workbook.addWorksheet('Meeting i involved');

    const meetings = await this.prismaService.projectMeeting.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
      },
      where: {
        Project: {
          ProjectMember: {
            some: {
              userId: userId,
            },
          },
        },
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isMeetingsEmpty = meetings.length === 0;
    const emptyArrayMeeting = [['', '', '', '', '', '', '']];

    sheetMeeting.addTable({
      name: 'meetingTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Meeting',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Description', filterButton: true },
        { name: 'Start Date', filterButton: true },
        { name: 'End Date', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Method', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isMeetingsEmpty
        ? emptyArrayMeeting
        : [
            ...meetings.map((meeting, index) => [
              index + 1,
              meeting.Project.ProjectClient.name,
              meeting.Project.name,
              meeting.name,
              meeting.description,
              meeting.startDate,
              meeting.endDate,
              meeting.status,
              meeting.method,
              meeting.createdAt,
              meeting.updatedAt,
            ]),
          ],
    });

    const sheetClient = workbook.addWorksheet('Client i am in');

    const clients = await this.prismaService.projectClient.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
      },
      where: {
        Project: {
          some: {
            ProjectMember: {
              some: {
                userId: userId,
              },
            },
          },
        },
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isClientsEmpty = clients.length === 0;
    const emptyArrayClient = [['', '', '', '', '', '', '']];

    sheetClient.addTable({
      name: 'clientTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Client',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Code', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isClientsEmpty
        ? emptyArrayClient
        : [
            ...clients.map((client, index) => [
              index + 1,
              client.name,
              client.code,
              client.createdAt,
              client.updatedAt,
            ]),
          ],
    });

    const ext = '.xlsx';
    const now = new Date();
    const nowAsString = now.toISOString().replace(/:/g, '-');
    const generateFilename = `report-developer-${nowAsString}${ext}`;
    const fullPath = `${pathReportExcel}/${generateFilename}`;
    const isDirExist = fs.existsSync(pathReportExcel);

    if (!isDirExist) {
      fs.mkdirSync(pathReportExcel, { recursive: true });
    }

    await workbook.xlsx.writeFile(fullPath);

    const mappingFullPath = `${process.cwd()}/${fullPath}`;

    return {
      error: false,
      message: 'Success generate report developer excel',
      name: generateFilename,
      relativePath: fullPath,
      fullPath: mappingFullPath,
    };
  }

  async generateReportOwner(
    idUser: number,
    params?: ProjectReportGenerateOwnerQueryParam,
  ) {
    const year = params?.year || new Date().getFullYear();
    const workbook = new ExcelJS.Workbook();

    const sheetUser = workbook.addWorksheet('User');

    const users = await this.prismaService.user.findMany({
      include: {
        role: true,
      },
    });

    const isUsersEmpty = users.length === 0;
    const emptyArrayUser = [['', '', '', '', '', '', '']];
    sheetUser.addTable({
      name: 'userTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'User',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Email', filterButton: true },
        { name: 'Role', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isUsersEmpty
        ? emptyArrayUser
        : [
            ...users.map((user, index) => [
              index + 1,
              user.name,
              user.email,
              user.role.name,
              user.createdAt,
              user.updatedAt,
            ]),
          ],
    });

    const sheetClient = workbook.addWorksheet('Client');

    const clients = await this.prismaService.projectClient.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isClientsEmpty = clients.length === 0;
    const emptyArrayClient = [['', '', '', '', '', '', '']];
    sheetClient.addTable({
      name: 'clientTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Client',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Code', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isClientsEmpty
        ? emptyArrayClient
        : [
            ...clients.map((client, index) => [
              index + 1,
              client.name,
              client.code,
              client.createdAt,
              client.updatedAt,
            ]),
          ],
    });

    const sheetProject = workbook.addWorksheet('Project');

    const projects = await this.prismaService.project.findMany({
      include: {
        ProjectClient: true,
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isProjectsEmpty = projects.length === 0;
    const emptyArrayProject = [['', '', '', '', '', '', '']];

    sheetProject.addTable({
      name: 'projectTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Project',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Code', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isProjectsEmpty
        ? emptyArrayProject
        : [
            ...projects.map((project, index) => [
              index + 1,
              project.ProjectClient.name,
              project.name,
              project.code,
              project.status,
              project.createdAt,
              project.updatedAt,
            ]),
          ],
    });

    const sheetMeeting = workbook.addWorksheet('Meeting');

    const meetings = await this.prismaService.projectMeeting.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isMeetingsEmpty = meetings.length === 0;

    const emptyArrayMeeting = [['', '', '', '', '', '', '']];
    sheetMeeting.addTable({
      name: 'meetingTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Meeting',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Description', filterButton: true },
        { name: 'Start Date', filterButton: true },
        { name: 'End Date', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Method', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isMeetingsEmpty
        ? emptyArrayMeeting
        : [
            ...meetings.map((meeting, index) => [
              index + 1,
              meeting.Project.ProjectClient.name,
              meeting.Project.name,
              meeting.name,
              meeting.description,
              meeting.startDate,
              meeting.endDate,
              meeting.status,
              meeting.method,
              meeting.createdAt,
              meeting.updatedAt,
            ]),
          ],
    });

    const sheetDocument = workbook.addWorksheet('Document');

    const documents = await this.prismaService.projectDocument.findMany({
      include: {
        Project: true,
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isDocumentsEmpty = documents.length === 0;
    const emptyArrayDocument = [['', '', '', '', '', '', '']];

    sheetDocument.addTable({
      name: 'documentTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Document',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Description', filterButton: true },
        { name: 'File', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isDocumentsEmpty
        ? emptyArrayDocument
        : [
            ...documents.map((document, index) => [
              index + 1,
              document.Project.name,
              document.name,
              document.description,
              document.file,
              document.createdAt,
              document.updatedAt,
            ]),
          ],
    });

    const sheetTask = workbook.addWorksheet('Task');

    const tasks = await this.prismaService.projectTask.findMany({
      include: {
        Project: {
          include: { ProjectClient: true },
        },
        User: true,
      },
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    const isTasksEmpty = tasks.length === 0;
    const emptyArrayTask = [['', '', '', '', '', '', '', '', '', '', '']];

    sheetTask.addTable({
      name: 'taskTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Task',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Project', filterButton: true },
        { name: 'Assign To', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Start Date', filterButton: true },
        { name: 'End Date', filterButton: true },
        { name: 'Difficulty', filterButton: true },
        { name: 'Status', filterButton: true },
        { name: 'Created At', filterButton: true },
        { name: 'Updated At', filterButton: true },
      ],
      rows: isTasksEmpty
        ? emptyArrayTask
        : [
            ...tasks.map((task, index) => [
              index + 1,
              task.Project.ProjectClient.name,
              task.Project.name,
              task.User.name,
              task.name,
              task.startDate,
              task.endDate,
              task.degreeOfDifficulty,
              task.status,
              task.createdAt,
              task.updatedAt,
            ]),
          ],
    });

    const sheetStatisticDeveloperAndProjectManager = workbook.addWorksheet(
      'Statistic Developer And Project Manager',
    );

    const statisticDeveloperAndProjectManager =
      await this.prismaService.user.findMany({
        where: {
          role: {
            code: {
              in: [roleCode.developer, roleCode.projectManager],
            },
          },
        },
        include: {
          role: true,
          _count: {
            select: {
              ProjectTask: true,
              ProjectMember: true,
              ProjectDocumentCreatedBy: true,
              ProjectMeetingMember: true,
            },
          },
        },
      });

    const isStatisticDeveloperAndProjectManagerEmpty =
      statisticDeveloperAndProjectManager.length === 0;

    const emptyArrayStatisticDeveloperAndProjectManager = [['', '', '', '']];

    sheetStatisticDeveloperAndProjectManager.addTable({
      name: 'statisticTable',
      ref: 'A1',
      headerRow: true,
      displayName: 'Statistic',
      columns: [
        { name: 'No', filterButton: true },
        { name: 'Name', filterButton: true },
        { name: 'Role', filterButton: true },
        { name: 'Total Assigned Task', filterButton: true },
        { name: 'Total Project Involved', filterButton: true },
        { name: 'Total Document Created', filterButton: true },
        { name: 'Total Meeting Involved', filterButton: true },
      ],
      rows: isStatisticDeveloperAndProjectManagerEmpty
        ? emptyArrayStatisticDeveloperAndProjectManager
        : [
            ...statisticDeveloperAndProjectManager.map((user, index) => [
              index + 1,
              user.name,
              user.role.name,
              user._count.ProjectTask,
              user._count.ProjectMember,
              user._count.ProjectDocumentCreatedBy,
              user._count.ProjectMeetingMember,
            ]),
          ],
    });

    const ext = '.xlsx';
    const now = new Date();
    const nowAsString = now.toISOString().replace(/:/g, '-');
    const generateFilename = `report-owner-${nowAsString}${ext}`;
    const fullPath = `${pathReportExcel}/${generateFilename}`;
    const isDirExist = fs.existsSync(pathReportExcel);

    if (!isDirExist) {
      fs.mkdirSync(pathReportExcel, { recursive: true });
    }

    await workbook.xlsx.writeFile(fullPath);

    const mappingFullPath = `${process.cwd()}/${fullPath}`;

    return {
      error: false,
      message: 'Success generate report owner excel',
      name: generateFilename,
      relativePath: fullPath,
      fullPath: mappingFullPath,
    };
  }
}
