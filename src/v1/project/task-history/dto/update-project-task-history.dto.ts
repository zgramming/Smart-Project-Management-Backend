import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTaskHistoryDto } from './create-project-task-history.dto';

export class UpdateProjectTaskHistoryDto extends PartialType(
  CreateProjectTaskHistoryDto,
) {}
