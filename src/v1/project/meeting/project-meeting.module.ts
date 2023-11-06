import { Module } from '@nestjs/common';
import { ProjectMeetingService } from './project-meeting.service';
import { ProjectMeetingController } from './project-meeting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectMeetingController],
  providers: [ProjectMeetingService, PrismaService],
})
export class ProjectMeetingModule {}
