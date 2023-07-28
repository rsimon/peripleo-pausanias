import { useEffect } from 'react';
import { useMap } from '../Map';
import { SearchResult, SearchStatus, useSearch } from '../../state';
import { WithId } from 'src/peripleo/state/Types';
import { MapGeoJSONFeature } from 'maplibre-gl';

const EMTPY_GEOJSON = {
  type: 'FeatureCollection',
  features: []
};

export interface LayerProps<T extends WithId>{

  id: string;

  toGeoJSON(result: SearchResult<T>): MapGeoJSONFeature;

}

export const Layer = <T extends WithId>(props: LayerProps<T>) => {

  const map = useMap();

  const { search } = useSearch();

  useEffect(() => {
    const onLoad = () => {
      map.addSource(`${props.id}-source`, {
        type: 'geojson',
        data: EMTPY_GEOJSON
      });

      // @ts-ignore
      map.addLayer({
        id: props.id,
        source: `${props.id}-source`, 
        metadata: {
          interactive: true
        }
      });  
    };

    map.on('load', onLoad);

    return () => {
      map.removeLayer(props.id);
      map.removeSource(`${props.id}-source`);
      map.off('load', onLoad);
    }
  }, []);

  useEffect(() => {
    if (search.status === SearchStatus.OK) {
      // @ts-ignore
      map.getSource(`${props.id}-source`).setData(props.toGeoJSON(search.result));
    }
  }, [search, props.id, props.toGeoJSON]);

  return null;
  
}