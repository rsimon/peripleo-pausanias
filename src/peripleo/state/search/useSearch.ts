import { useCallback, useContext } from 'react';
import { SearchContext } from './SearchProvider';
import { Filter, SearchArgs, SearchState, SearchStatus } from './SearchTypes';

export const useSearch = <T extends unknown>() => {

  const { search, setSearch } = useContext(SearchContext);

  const runSearch = useCallback((args: SearchArgs = {}) =>
    setSearch({ args, status: SearchStatus.PENDING, result: search.result }), [setSearch]);

  const refreshSearch = useCallback(() =>
    runSearch({ ...search.args }), [setSearch]);

  const changeSearchQuery = useCallback((query: string) => 
    runSearch({ ...search.args, query }), [setSearch]);

  const clearSearchQuery = useCallback(() => 
    runSearch({ ...search.args, query: undefined }), [setSearch]);

  const setFilter = useCallback((filter: Filter) => {
    const updatedFilters = [
      ...(search.args.filters || []).filter(f => f.name !== filter.name),
      filter
    ];

    runSearch({ ...search.args, filters: updatedFilters });
  }, [setSearch]);

  const clearFilter = useCallback((filterName: string) => {
    const updatedFilters = [
      ...(search.args.filters || []).filter(f => f.name !== filterName)
    ];

    runSearch({ ...search.args, filters: updatedFilters });
  }, [setSearch]);

  const getFilter = useCallback((name: string) =>
    search.args.filters?.find(f => f.name === name), [setSearch]);

  // Note that switching the facet does not require 
  // a new search run!
  const setActiveAggregation = useCallback((name: string) => 
    setSearch({ 
      args: {
        ...search.args,
        activeAggregation: name
      }, 
      status: search.status,
      result: search.result 
    }), [setSearch]);

  return {
    changeSearchQuery,
    clearFilter,
    clearSearchQuery,
    getFilter,
    refreshSearch,
    search: search as SearchState<T>,
    setActiveAggregation,
    setFilter,
    setSearch
  };

}