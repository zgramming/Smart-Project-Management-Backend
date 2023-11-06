import { Module } from '@nestjs/common';
import { ProjectMeetingMemberService } from './project-meeting-member.service';
import { ProjectMeetingMemberController } from './project-meeting-member.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectMeetingMemberController],
  providers: [ProjectMeetingMemberService, PrismaService],
})
export class ProjectMeetingMemberModule {}
