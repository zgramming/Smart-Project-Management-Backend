import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMeetingMemberDto } from './create-project-meeting-member.dto';

export class UpdateProjectMeetingMemberDto extends PartialType(
  CreateProjectMeetingMemberDto,
) {}
