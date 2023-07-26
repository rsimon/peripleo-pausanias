import { Item, Place, Trace, Store, WithId } from '../../Types';

export const createLocalStore = <T extends WithId>(): Store<T> => {

  const places = new Map<string, Place>();

  const allItems = (): Item<T>[] => null;

  const allPlaces = (): Place[] =>
    ([...places.values()]);

  const allTraces = (): Trace<T>[] => null;

  const getItemsAt = (placeOrId: Place | string): Item<T>[] => null;

  const getPlacesIntersecting = (minLon: number, minLat: number, maxLon: number, maxLat: number): Place[] => null;

  const getTracesAt = (placeOrId: Place | string): Trace<T>[] => null;

  const isEmpty = () => places.size === 0;

  const setData = (p: Place[], t: Trace<T>[], keepExisting = false) => {
    if (!keepExisting)
      places.clear();

    // Normalize @id field to id
    p.forEach(p => { 
      if (!p.id)
        p.id = p['@id'];
    });

    p.forEach(place => places.set(place.id, place));
  }

  return {
    allItems,
    allPlaces,
    allTraces,
    getItemsAt,
    getPlacesIntersecting,
    getTracesAt,
    isEmpty,
    minItemsPerPlace: 0,
    maxItemsPerPlace: 0,
    setData
  };

}