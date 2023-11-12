import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IModulFindAllQueryParam
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
