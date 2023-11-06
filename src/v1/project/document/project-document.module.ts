import { Module } from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { ProjectDocumentController } from './project-document.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectDocumentController],
  providers: [ProjectDocumentService, PrismaService],
})
export class ProjectDocumentModule {}
