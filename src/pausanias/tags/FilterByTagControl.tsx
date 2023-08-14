import { useEffect } from 'react';
import { Tag } from '@phosphor-icons/react';

interface FilterByTagControlProps {

  tei?: Element;

}

export const FilterByTagControl = (props: FilterByTagControlProps) => {

  const { tei } = props;

  useEffect(() => {
    const placeNames = Array.from(tei.querySelectorAll('tei-body tei-placename'));

    // TODO get tags

  }, []);

  return (
    <div className="p6o-control p6o-control-btn pausanias-filter-by-tag">
      <Tag size={20} />
    </div>
  )

}