import { BaseQueryParamsInterface } from 'src/interface/base_query_params.interface';

export interface IMasterDataFindAllQueryParams
  extends Partial<BaseQueryParamsInterface> {
  name?: string;
}
