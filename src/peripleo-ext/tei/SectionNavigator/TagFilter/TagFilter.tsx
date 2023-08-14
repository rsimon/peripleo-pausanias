import './TagFilter.css';

interface TagFilterProps {

  placesInViewport: Element[];

}

const getUniqueSortedByOccurrences = (arr: string[]) => {
  const occurrences = {} as { [key: string]: number };
  
  arr.forEach(str => 
    occurrences[str] = (occurrences[str] || 0) + 1);
  
  const occurrencePairs = Object.entries(occurrences);

  console.log(occurrences);
  
  occurrencePairs.sort((a, b) => b[1] - a[1]);
  const sortedUniqueStrings = occurrencePairs.map(pair => pair[0]);
  
  return sortedUniqueStrings;
}

export const TagFilter = (props: TagFilterProps) => {

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
      <button>
        {first.join(' ')} {unique.length > 2 && (
          <span className="more-tags-badge">
            + {unique.length - 2}
          </span>
        )}
      </button>
    </div>
  )

}