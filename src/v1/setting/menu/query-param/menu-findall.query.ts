import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IMenuFindAllQueryParams
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
