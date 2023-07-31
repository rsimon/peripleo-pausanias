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

  const places = new Map<string, Place>();

  const items = new Map<string, Item<T>>();

  const allItems = (): Item<T>[] =>
    ([...items.values()]);

  const allPlaces = (): Place[] =>
    ([...places.values()]);

  const allTraces = (): Trace<T>[] => null;

  const getExtent = (): Bounds => null;

  const getItemsAt = (placeOrId: Place | string): Item<T>[] => null;

  const getItemById = (id: string) => items.get(id);

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
    t.forEach(t => t.items.forEach(item => items.set(item.id, item)));
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