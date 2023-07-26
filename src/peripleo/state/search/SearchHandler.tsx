import { useEffect } from 'react';
import { Store, WithId } from '../Types';
import { useStore } from '../store';
import { useSearch } from './useSearch';
import { SearchArgs, SearchResult, SearchStatus } from './SearchTypes';

interface SearchHandlerProps<T extends WithId> {

  onSearch(arg: { args: SearchArgs, store: Store<T> }): SearchResult<T>;

}

export const SearchHandler = <T extends WithId>(props: SearchHandlerProps<T>) => {

  const store = useStore<T>();

  const { search, setSearch } = useSearch<T>();

  useEffect(() => {
    if (store && !store.isEmpty()) {
      if (search.status === SearchStatus.PENDING) {
        const result = props.onSearch({ args: search.args, store });

        setSearch({
          args: search.args,
          status: SearchStatus.OK,
          result
        });
      }
    }
  }, [props.onSearch, search, setSearch, store]);

  return null;

}