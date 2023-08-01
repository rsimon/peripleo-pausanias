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
  const filter = args.filters?.find(f => f.name === 'visible-waypoints');

  if (filter) {
    const visibleReferences: Item<PlaceReference>[] = filter.value
      .map((id: string) => store.getItemById(id))
      // Import discareds references with no resolved place,
      // therefore some can be undefined
      .filter((item: Item<PlaceReference>) => item);

    const byPlace = aggregateByPlace(visibleReferences);

    return {
      // TODO doesn't take visible refs into account!
      bounds: store.getExtent(),
      total: visibleReferences.length,
      items: visibleReferences,
      aggregations: { byPlace }
    }
  } else {
    const all = store.allItems();

    const byPlace = aggregateByPlace(all);

    return {
      bounds: store.getExtent(),
      total: all.length,
      items: all,
      aggregations: { byPlace }
    }
  }

}
