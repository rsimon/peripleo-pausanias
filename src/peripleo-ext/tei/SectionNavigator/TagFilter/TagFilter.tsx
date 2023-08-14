import './TagFilter.css';

interface TagFilterProps {

  placesInViewport: Element[];

}

export const TagFilter = (props: TagFilterProps) => {

  // TODO get tags from places in viewport
  const tags = [];

  return (
    <div className="p6o-teiview-tags">
      <button>
        #built #settlement
      </button>
    </div>
  )

}