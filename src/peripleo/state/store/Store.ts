import { Place } from './Place';
import { Trace, Item } from './Trace';

export interface Store<T extends any> {

  allItems(): Item<T>[];

  allPlaces(): Place;

  allTraces(): Trace<T>[];

  getItemsAt(placeOrId: Place | string): Item<T>[];

  getPlacesIntersecting(minLon: number, minLat: number, maxLon: number, maxLat: number): Place[];

  getTracesAt(placeOrId: Place | string): Trace<T>[];

  minItemsPerPlace: number;

  maxItemsPerPlace: number;

}