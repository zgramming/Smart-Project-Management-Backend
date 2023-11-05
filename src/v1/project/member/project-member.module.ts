import { Module } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberController } from './project-member.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService, PrismaService],
})
export class ProjectMemberModule {}
