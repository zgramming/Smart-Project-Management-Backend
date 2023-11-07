import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IProjectFindAllQueryParam
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
