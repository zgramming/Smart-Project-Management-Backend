import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IProjectTaskHistoryFindByProjectIdQuery
  extends Partial<BaseQueryParamsInterface> {
  projectId?: number;
}
