import { Item, Place, Trace, Store, Bounds } from '../../../Types';

// Various data normalization ops
const normalizePlace = (p: Place): Place => {
  let id = p.id || p['@id'];

  id = id.replace('https', 'http');

  p.id = id;
  delete p['@id'];

  return p;
}

export const createLocalStore = <T extends unknown>(): Store<T> => {

  // All places by ID
  const places = new Map<string, Place>();

  // List of items by trace ID
  const traces = new Map<string, Trace<T>>();

  // All items by ID, as a tuple [item, trace ID]
  const items = new Map<string, { item: Item<T>, trace: string }>();

  const allItems = (): Item<T>[] =>
    [...items.values()].map(t => t.item);

  const allPlaces = (): Place[] =>
    ([...places.values()]);

  const allTraces = (): Trace<T>[] =>
    ([...traces.values()]);

  const getExtent = (): Bounds => null;

  const getItemsAt = (placeOrId: Place | string): Item<T>[] => null;

  const getItemById = (id: string) => items.get(id)?.item;

  const getPlaceById = (id: string) => places.get(id);

  const getPlacesIntersecting = (minLon: number, minLat: number, maxLon: number, maxLat: number): Place[] => null;

  const getTracesAt = (placeOrId: Place | string): Trace<T>[] => null;

  const isEmpty = () => places.size === 0;

  const setData = (p: Place[], t: Trace<T>[], keepExisting = false) => {
    if (!keepExisting) {
      places.clear();
      items.clear();
    }

    p.forEach(normalizePlace);

    p.forEach(place => places.set(place.id, place));

    t.forEach(t => traces.set(t.id, t));

    t.forEach(t => t.items.forEach(item => items.set(item.id, { item, trace: t.id })));
  }

  return {
    allItems,
    allPlaces,
    allTraces,
    getExtent,
    getItemsAt,
    getItemById,
    getPlaceById,
    getPlacesIntersecting,
    getTracesAt,
    isEmpty,
    minItemsPerPlace: 0,
    maxItemsPerPlace: 0,
    setData
  };

}