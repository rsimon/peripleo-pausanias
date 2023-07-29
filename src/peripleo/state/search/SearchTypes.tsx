import { Bounds, WithId } from '../Types';

export interface SearchState<T extends WithId> {
  
  args: SearchArgs;
  
  status: SearchStatus;
    
  result?: SearchResult<T> | null;
  
}

export interface SearchArgs {

  query?: string

  filters?: Filter[]

  activeAggregation?: string

  fitMap?: boolean

}

export interface Filter {

  name: string

  [key: string]: any;

}

export enum SearchStatus {

  PENDING = 'PENDING',

  OK = 'OK',

  FAILED = 'FAILED'

}

export interface SearchResult<T extends WithId> {

  total: number,

  items: ResultItem<T>[],

  bounds: Bounds;

  aggregations?: {

    [key: string]: {

      buckets: {

        label: string,
        
        count: number
        
      }[]

    }

  }

}

export type ResultItem<T extends WithId> = T;