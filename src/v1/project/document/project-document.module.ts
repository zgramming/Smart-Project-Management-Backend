import { Module } from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { ProjectDocumentController } from './project-document.controller';

@Module({
  controllers: [ProjectDocumentController],
  providers: [ProjectDocumentService],
})
export class ProjectDocumentModule {}
