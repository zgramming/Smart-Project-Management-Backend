import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDocumentDto } from './create-project-document.dto';

export class UpdateProjectDocumentDto extends PartialType(
  CreateProjectDocumentDto,
) {}
