export interface SearchState<T extends { id: string }> {
  
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

export interface SearchResult<T extends { id: string }> {

  total: number,

  items: ResultItem<T>[],

  aggregations?: {

    [key: string]: {

      buckets: {

        label: string,
        
        count: number
        
      }[]

    }

  }

}

export type ResultItem<T extends { id: string; }> = T;