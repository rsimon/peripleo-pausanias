import { FeatureCollection, Place } from '../../peripleo';

export const toGeoJSON = ({ result, store }): FeatureCollection => { 
  const byPlace = result.aggregations.byPlace.buckets;

  const features = byPlace.reduce((places, bucket: { label: string, count: number}) => {
    const place = store.getPlaceById(bucket.label);
    return place ? [...places, { 
      ...place,
      properties: {
        ...place.properties,
        occurrences: bucket.count
      }
    }] : places;
  }, [] as Place[]);

  return { type: 'FeatureCollection', features };
}