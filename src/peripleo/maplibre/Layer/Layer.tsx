import { useEffect, useState } from 'react';
import { useMap } from '../Map';
import { SearchResult, SearchStatus, useSearch, useStore } from '../../state';
import { FeatureCollection, Store, WithId } from 'src/peripleo/state/Types';

const EMPTY_GEOJSON = {
  type: 'FeatureCollection',
  features: []
};

export interface LayerProps<T extends WithId> {

  id: string;

  toGeoJSON(arg: { result: SearchResult<T>, store: Store<T> }): FeatureCollection;

}

export const Layer = <T extends WithId>(props: LayerProps<T>) => {

  const map = useMap();

  const store = useStore<T>();

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
        console.log(`[Peripleo] Creating data layer: ${props.id}`);

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
        const geojson = props.toGeoJSON({ result: search.result, store });

        // @ts-ignore
        map.getSource(sourceId).setData(geojson);
      }
    }
  }, [mapLoaded, sourceId, search, props.id, props.toGeoJSON]);

  return null;
}
