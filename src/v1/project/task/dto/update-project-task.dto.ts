import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTaskDto } from './create-project-task.dto';

export class UpdateProjectTaskDto extends PartialType(CreateProjectTaskDto) {}
