export interface Feature {

  type: 'Feature',

  properties: {

    [key: string]: any;

  }

  geometry: {

    type: 'Point' | 'Polygon' | 'Polyline',

    coordinates: number[] | number[][] | number[][][];

  }

}

export interface FeatureCollection {

  type: 'FeatureCollection',

  features: Feature[];

}

export interface Bounds {

  minLon: number;

  minLat: number;

  maxLon: number;

  maxLat: number;

} 

export interface WithId {

  id: string

}

export interface Place extends Feature {

  id: string;

  properties: {

    title: string;

    [key: string]: any

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

  getExtent(): Bounds;

  getItemsAt(placeOrId: Place | string): Item<T>[];

  getPlacesIntersecting(minLon: number, minLat: number, maxLon: number, maxLat: number): Place[];

  getTracesAt(placeOrId: Place | string): Trace<T>[];

  isEmpty(): boolean;

  minItemsPerPlace: number;

  maxItemsPerPlace: number;

  setData(places: Place[], traces: Trace<T>[], keepExisting?: boolean): void;

}