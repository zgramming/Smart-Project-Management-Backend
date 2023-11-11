import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import * as fs from 'fs';
import * as ExcelJS from 'exceljs';
import { pathReportExcel } from 'src/utils/constant';
import { handlingCustomError } from 'src/utils/function';
import { ProjectReportGenerateProjectManagerQuery } from './query-param/project-report-generate-project-manager.query';

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
    params?: ProjectReportGenerateProjectManagerQuery,
  ) {
    const { year } = params || { year: new Date().getFullYear() };
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
      rows: [
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
      rows: [
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
      rows: [
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
      rows: [
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

    const now = new Date();
    const nowAsString = now.toISOString().replace(/:/g, '-');
    const generateFilename = `project-manager-report-${nowAsString}`;
    const fullPath = `${pathReportExcel}/${generateFilename}.xlsx`;
    const isDirExist = fs.existsSync(pathReportExcel);

    if (!isDirExist) {
      fs.mkdirSync(pathReportExcel, { recursive: true });
    }

    await workbook.xlsx.writeFile(fullPath);
    const mappingFullPath = `${process.cwd()}/${fullPath}`;
    return {
      error: false,
      message: 'Success generate report project manager excel',
      data: mappingFullPath,
    };
  }
}
