import { useEffect, useState } from 'react';
import { useMap } from '../Map';
import { SearchResult, SearchStatus, useSearch } from '../../state';
import { WithId } from 'src/peripleo/state/Types';
import { MapGeoJSONFeature } from 'maplibre-gl';

const EMPTY_GEOJSON = {
  type: 'FeatureCollection',
  features: []
};

export interface LayerProps<T extends WithId> {

  id: string;

  toGeoJSON(result: SearchResult<T>): MapGeoJSONFeature;

}

export const Layer = <T extends WithId>(props: LayerProps<T>) => {

  const map = useMap();

  const { search } = useSearch<T>();

  const [mapLoaded, setMapLoaded] = useState(false);

  const [sourceId, setSourceId] = useState<string | null>(null);

  useEffect(() => {
    const onLoad = () => setMapLoaded(true);
    map.on('load', onLoad);
  }, []);

  useEffect(() => {
    if (mapLoaded && search.status === SearchStatus.OK) {
      if (!sourceId) {
        console.log(`Creating data layer ${props.id}`);

        // No source yet - create
        const sourceId = `${props.id}-source`;

        map.addSource(sourceId, {
          type: 'geojson',
          data: EMPTY_GEOJSON
        });

        // @ts-ignore
        map.addLayer({
          type: 'circle',
          id: props.id,
          source: sourceId,
          metadata: {
            interactive: true,
          }
        });

        setSourceId(sourceId);
      } else {
        console.log(`Plotting data layer ${props.id}`);

        // @ts-ignore
        map.getSource(sourceId).setData(props.toGeoJSON(search.result));
      }
    }
  }, [mapLoaded, sourceId, search, props.id, props.toGeoJSON]);

  return null;
}
