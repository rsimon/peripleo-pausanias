import { useEffect } from 'react';
import { SearchStatus, useSearch } from '../peripleo';

export const PlaceLayer = () => {

  const { search } = useSearch();

  useEffect(() => {
    if (search.status === SearchStatus.OK) {
      console.log(search.result);
    }
  }, [search]);

  return null;

}