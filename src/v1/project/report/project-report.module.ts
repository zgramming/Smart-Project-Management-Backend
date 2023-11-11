import { Module } from '@nestjs/common';
import { ProjectReportService } from './project-report.service';
import { ProjectReportController } from './project-report.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectReportController],
  providers: [ProjectReportService, PrismaService],
})
export class ProjectReportModule {}
