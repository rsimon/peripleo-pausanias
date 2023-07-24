import { ReactElement, createContext, useContext, useState } from 'react';
import { SearchState, SearchStatus } from './SearchTypes';

const EMPTY = { args: {}, status: SearchStatus.PENDING };

interface SearchContextValue<T extends { id: string } = { id: string }>{

  search: SearchState<T>;

  setSearch: React.Dispatch<React.SetStateAction<SearchState<T> | null>>;

}

export const SearchContext = createContext<SearchContextValue>({ search: EMPTY, setSearch: null });

export const SearchProvider = <T extends { id: string}>(props: { children: ReactElement}) => {

  const [search, setSearch]  = useState<SearchState<T>>(EMPTY);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  )

}