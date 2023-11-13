import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IParameterFindAllQueryParam
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
