import { useEffect } from 'react';
import { WithId } from '../Types';
import { useStore } from '../store';
import { useSearch } from './useSearch';
import { SearchArgs, SearchResult, SearchStatus } from './SearchTypes';

interface SearchHandlerProps<T extends WithId> {

  onSearch(args: SearchArgs): SearchResult<T>;

}

export const SearchHandler = <T extends WithId>(props: SearchHandlerProps<T>) => {

  const store = useStore();

  const { search, setSearch } = useSearch<T>();

  useEffect(() => {
    if (search.status === SearchStatus.PENDING) {
      const result = props.onSearch(search.args);

      setSearch({
        args: search.args,
        status: SearchStatus.OK,
        result
      });
    }
  }, [props.onSearch, search, setSearch, store]);

  return null;

}