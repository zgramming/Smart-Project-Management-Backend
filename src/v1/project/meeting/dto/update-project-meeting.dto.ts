import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMeetingDto } from './create-project-meeting.dto';

export class UpdateProjectMeetingDto extends PartialType(
  CreateProjectMeetingDto,
) {}
