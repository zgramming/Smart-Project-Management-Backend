import { Module } from '@nestjs/common';
import { ProjectClientService } from './project_client.service';
import { ProjectClientController } from './project_client.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectClientController],
  providers: [ProjectClientService, PrismaService],
})
export class ProjectClientModule {}
