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
      fc(props.data?.features.filter(f => f.geometry?.type === 'Point'));

    const shapes =
      fc(props.data?.features.filter(f => f.geometry?.type !== 'Point'));

    const pointSourceId = `${props.id}-pt-source`;
    const pointLayerId = `${props.id}-pt`;

    const shapeSourceId = `${props.id}-sh-source`;
    const shapeLayerId = `${props.id}-sh`;

    map.addSource(pointSourceId, {
      type: 'geojson',
      data: points
    });

    map.addSource(shapeSourceId, {
      type: 'geojson',
      data: shapes
    });

    // @ts-ignore
    map.addLayer({
      // ...props.style,
      'type': 'circle',
      id: pointLayerId,
      source: pointSourceId,
      metadata: {
        interactive: true,
      }
    });

    map.addLayer({
      // ...props.style,
      'type': 'fill',
      id: shapeLayerId,
      source: shapeSourceId,
      metadata: {
        interactive: true,
      }
    });

    return () => {
      map.removeLayer(pointLayerId);
      map.removeLayer(shapeLayerId);
      
      map.removeSource(pointSourceId);
      map.removeSource(shapeSourceId);
    }
  }, []);

  return null;

}