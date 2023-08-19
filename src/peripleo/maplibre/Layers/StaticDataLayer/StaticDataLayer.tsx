import { useEffect } from 'react';
import { Feature, FeatureCollection } from '../../../Types';
import { useMap } from '../../Map';

interface StaticDataLayerProps {

  id: string;

  data?: FeatureCollection;

}

const fc = (data?: Feature[]) => ({ 
  type: 'FeatureCollection', 
  features: data || []
});

export const StaticDataLayer = (props: StaticDataLayerProps) => {

  const map = useMap();

  useEffect(() => {
    const points = 
      fc(props.data?.features.filter(f => f.geometry.type === 'Point'));

    const shapes =
      fc(props.data?.features.filter(f => f.geometry.type !== 'Point'));

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