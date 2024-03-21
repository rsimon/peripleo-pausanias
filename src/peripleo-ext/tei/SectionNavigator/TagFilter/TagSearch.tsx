import { useEffect, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

import './TagSearch.css';

interface TagSearchProps {

  onChange(value: string): void;

}

export const TagSearch = (props: TagSearchProps) => {

  const [value, setValue] = useState('');

  useEffect(() => props.onChange(value), [value]);

  return (
    <div className="p6o-more-tags-search">
      <MagnifyingGlass size={18} />

      <input 
        value={value}
        onChange={evt => setValue(evt.target.value)}
        placeholder="Search..." />
    </div>
  )

}