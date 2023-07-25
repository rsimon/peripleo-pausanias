import { Place } from '../Place';
import { Store } from '../Store';
import { Item, Trace } from '../Trace';

export const createLocalStore = <T extends unknown>(): Store<T> => {

  const allItems = (): Item<T>[] => null;

  const allPlaces = (): Place[] => null;

  const allTraces = (): Trace<T>[] => null;

  const getItemsAt = (placeOrId: Place | string): Item<T>[] => null;

  const getPlacesIntersecting = (minLon: number, minLat: number, maxLon: number, maxLat: number): Place[] => null;

  const getTracesAt = (placeOrId: Place | string): Trace<T>[] => null;

  const setData = (places: Place[], traces: Trace<T>[], keepExisting = false) => {
    console.log('loading data', places, traces);
  }

  return {
    allItems,
    allPlaces,
    allTraces,
    getItemsAt,
    getPlacesIntersecting,
    getTracesAt,
    minItemsPerPlace: 0,
    maxItemsPerPlace: 0,
    setData
  };

}