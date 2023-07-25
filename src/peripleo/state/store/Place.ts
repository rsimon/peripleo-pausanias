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