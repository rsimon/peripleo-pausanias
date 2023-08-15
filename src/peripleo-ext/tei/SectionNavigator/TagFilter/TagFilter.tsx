import { useState } from 'react';
import { CaretDown, PushPinSimple } from '@phosphor-icons/react';

import './TagFilter.css';

interface TagFilterProps {

  placesInViewport: Element[];

}

const getUniqueSortedByOccurrences = (arr: string[]) => {
  const occurrences = {} as { [key: string]: number };
  
  arr.forEach(str => 
    occurrences[str] = (occurrences[str] || 0) + 1);
  
  const occurrencePairs = Object.entries(occurrences);

  occurrencePairs.sort((a, b) => b[1] - a[1]);
  const sortedUniqueStrings = occurrencePairs.map(pair => pair[0]);
  
  return sortedUniqueStrings;
}

export const TagFilter = (props: TagFilterProps) => {

  const [pinned, setPinned] = useState<string | undefined>();

  const togglePin = (tag: string) => () => 
    setPinned(current => current === tag ? undefined : tag);

  const tags = props.placesInViewport.reduce((tags, placeName) => {
    const ana = placeName
      .getAttribute('ana')
      .trim()
      .split('#')
      .filter(str => str) // Filter first empty string
      .map(str => `#${str}`.trim());

    return [...tags, ...ana];
  }, [] as string[]);

  const unique = getUniqueSortedByOccurrences(tags);

  const first = unique.slice(0, 2);

  return (
    <div className="p6o-teiview-tags">
      {first.map(tag => (
        <button 
          className={pinned === tag ? 'pinned' : undefined}
          onClick={togglePin(tag)}>
          {pinned === tag && (
            <PushPinSimple size={14} weight="fill" />
          )} {tag}
        </button>
      ))} {unique.length > 2 && (
        <button className="more-tags">
          <CaretDown size={10} weight="bold" /> {unique.length - 2} more
        </button>
      )}
    </div>
  )

}