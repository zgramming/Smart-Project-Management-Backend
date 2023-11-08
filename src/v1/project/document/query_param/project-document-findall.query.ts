import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IProjectDocumentFindAllQuery
  extends Partial<BaseQueryParamsInterface> {
  clientId?: string;
  projectId?: number;
  name?: string;
}
