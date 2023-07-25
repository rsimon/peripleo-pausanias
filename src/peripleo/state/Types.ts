export interface WithId {

  id: string

} 

export interface Place {

  type: 'Feature';

  id: string;

  properties: {

    title: string;

    [key: string]: any

  }

  geometry: {

    type: 'Point';

    coordinates: number[] | number[][] | number[][][];

  }

}

export interface Trace<T extends WithId> {

  items: Item<T>[];

}

export interface Item<T extends WithId> {

  id: string;

  type: 'Annotation';

  target: {

    value: T;

  }

  body:  {

    type: 'Dataset';

    value: WithId;
    
  }

}

export interface Store<T extends WithId> {

  allItems(): Item<T>[];

  allPlaces(): Place[];

  allTraces(): Trace<T>[];

  getItemsAt(placeOrId: Place | string): Item<T>[];

  getPlacesIntersecting(minLon: number, minLat: number, maxLon: number, maxLat: number): Place[];

  getTracesAt(placeOrId: Place | string): Trace<T>[];

  minItemsPerPlace: number;

  maxItemsPerPlace: number;

  setData(places: Place[], traces: Trace<T>[], keepExisting?: boolean): void;

}