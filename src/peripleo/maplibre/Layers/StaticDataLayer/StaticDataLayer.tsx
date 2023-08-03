import { useEffect } from 'react';
import { FeatureCollection } from '../../../Types';
import { useMap } from '../../Map';

interface StaticDataLayerProps {

  id: string;

  data?: FeatureCollection;

}

export const StaticDataLayer = (props: StaticDataLayerProps) => {

  const map = useMap();

  useEffect(() => {
    const sourceId = `${props.id}-source`;

    map.addSource(sourceId, {
      type: 'geojson',
      data: props.data
    });

    // @ts-ignore
    map.addLayer({
      // ...props.style,
      'type': 'circle',
      id: props.id,
      source: sourceId,
      metadata: {
        interactive: true,
      }
    });

    return () => {
      map.removeLayer(props.id);
      map.removeSource(sourceId);
    }
  }, []);

  return null;

}