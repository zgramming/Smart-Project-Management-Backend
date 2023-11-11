import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectReportDto } from './create-project-report.dto';

export class UpdateProjectReportDto extends PartialType(
  CreateProjectReportDto,
) {}
