import { MeetingMethodEnum } from '@prisma/client';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IProjectMeetingFindAllQuery extends BaseQueryParamsInterface {
  name?: string;
  projectId?: number;
  startDate?: Date;
  endDate?: Date;
  method?: MeetingMethodEnum;
}
