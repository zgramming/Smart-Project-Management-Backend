import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectClientDto } from './create-project_client.dto';

export class UpdateProjectClientDto extends PartialType(
  CreateProjectClientDto,
) {}
