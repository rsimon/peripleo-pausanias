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

  const allItems = (): Item<T>[] => null;

  const allPlaces = (): Place[] =>
    ([...places.values()]);

  const allTraces = (): Trace<T>[] => null;

  const getExtent = (): Bounds => null;

  const getItemsAt = (placeOrId: Place | string): Item<T>[] => null;

  const getPlaceById = (id: string) => places.get(id);

  const getPlacesIntersecting = (minLon: number, minLat: number, maxLon: number, maxLat: number): Place[] => null;

  const getTracesAt = (placeOrId: Place | string): Trace<T>[] => null;

  const isEmpty = () => places.size === 0;

  const setData = (p: Place[], t: Trace<T>[], keepExisting = false) => {
    if (!keepExisting)
      places.clear();

    p.forEach(normalizePlace);

    p.forEach(place => places.set(place.id, place));
  }

  return {
    allItems,
    allPlaces,
    allTraces,
    getExtent,
    getItemsAt,
    getPlaceById,
    getPlacesIntersecting,
    getTracesAt,
    isEmpty,
    minItemsPerPlace: 0,
    maxItemsPerPlace: 0,
    setData
  };

}