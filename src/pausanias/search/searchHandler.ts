import { Item, SearchArgs, SearchResult, Store } from '../../peripleo';
import { PlaceReference } from '../Types';

const aggregateByPlace = (items: Item<PlaceReference>[]) => {
  const byPlace: { [id: string]: number } = items.reduce((aggregated, item) => {
    const places = item.body.value.map(v => v.id);

    places.forEach(id => {
      aggregated[id] = (aggregated[id] || 0) + 1;
    });

    return aggregated;
  }, {});

  return { 
    buckets: Object.entries(byPlace).map(([id, count]) => ({
      label: id,
      count
    }))
  }
}

export const onSearch = (
  { args, store }: { args: SearchArgs, store: Store<PlaceReference> }
): SearchResult<Item<PlaceReference>> => {
  const viewportFilter = args.filters?.find(f => f.name === 'visible-waypoints');
  const tagFilter = args.filters?.find(f => f.name === 'tag'); 

  if (viewportFilter || tagFilter) {
    const visibleReferences: Item<PlaceReference>[] = 
      viewportFilter ? 
        viewportFilter.value
          .map((id: string) => store.getItemById(id))
          // Import discareds references with no resolved place,
          // therefore some can be undefined
          .filter((item: Item<PlaceReference>) => item) :

        store
          .allItems()
          .filter((item: Item<PlaceReference>) => item);

    const filteredByTag = tagFilter ? 
      visibleReferences
        .filter((item: Item<PlaceReference>) => { 
          const p = item.target.value;
          return p.tags.includes(tagFilter.value)
        }) :

      visibleReferences;

    const byPlace = aggregateByPlace(filteredByTag);

    return {
      // TODO doesn't take visible refs into account!
      bounds: store.getExtent(),
      total: filteredByTag.length,
      items: filteredByTag,
      aggregations: { byPlace }
    }
  } else {
    const all = store
      .allItems()
      .filter((item: Item<PlaceReference>) => item);

    const byPlace = aggregateByPlace(all);

    return {
      bounds: store.getExtent(),
      total: all.length,
      items: all,
      aggregations: { byPlace }
    }
  }

}
