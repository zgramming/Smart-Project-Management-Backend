import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IRolesFindAllQueryParams
  extends Partial<BaseQueryParamsInterface> {
  code?: string;
  name?: string;
}
