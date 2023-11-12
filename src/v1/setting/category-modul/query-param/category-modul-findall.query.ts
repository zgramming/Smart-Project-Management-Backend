import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface ICategoryModulFindAllQueryParams
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
