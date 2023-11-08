import { ProjectTaskStatusEnum } from '@prisma/client';
import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IProjectTaskFindAllQuery
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
  projectId?: number;
  userId?: number;
  clientId?: string;
  status?: ProjectTaskStatusEnum;
}
