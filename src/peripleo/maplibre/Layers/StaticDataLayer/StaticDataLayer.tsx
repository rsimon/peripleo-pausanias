import { useEffect } from 'react';
import bbox from '@turf/bbox';
import { Feature, FeatureCollection } from '../../../Types';
import { useMap } from '../../Map';
import { pointStyle, fillStyle, strokeStyle } from './styles';

interface StaticDataLayerProps {

  id: string;

  data?: FeatureCollection;

  color?: string;

}

const fc = (data?: Feature[]) => ({ 
  type: 'FeatureCollection', 
  features: data || []
});

export const StaticDataLayer = (props: StaticDataLayerProps) => {

  const map = useMap();

  useEffect(() => {
    const geometry = fc(props.data?.features.filter(f => f.geometry));

    const points = 
      fc(geometry.features.filter(f => f.geometry?.type === 'Point'));

    const shapes =
      fc(geometry.features.filter(f => f.geometry?.type !== 'Point'));

    const pointSourceId = `${props.id}-pt-source`;
    const pointLayerId = `${props.id}-pt`;

    const fillSourceId = `${props.id}-fill-source`;
    const fillLayerId = `${props.id}-fill`;

    const strokeSourceId = `${props.id}-stroke-source`;
    const strokeLayerId = `${props.id}-stroke`;

    map.addSource(pointSourceId, {
      type: 'geojson',
      data: points
    });

    map.addSource(fillSourceId, {
      type: 'geojson',
      data: shapes
    });

    map.addSource(strokeSourceId, {
      type: 'geojson',
      data: shapes
    });

    // @ts-ignore
    map.addLayer({
      ...pointStyle({ color: props.color }),
      id: pointLayerId,
      source: pointSourceId,
      metadata: {
        interactive: true,
      }
    });

    // @ts-ignore
    map.addLayer({
      ...fillStyle({ fill: props.color }),
      id: fillLayerId,
      source: fillSourceId,
      metadata: {
        interactive: true,
      }
    });

    // @ts-ignore
    map.addLayer({
      ...strokeStyle({ fill: props.color }),
      id: strokeLayerId,
      source: strokeSourceId,
      metadata: {
        interactive: false,
      }
    });

    const [minLon, minLat, maxLon, maxLat] = bbox(geometry);
    map.fitBounds([[minLon, minLat], [maxLon, maxLat]], { padding: 100 });

    return () => {
      map.removeLayer(pointLayerId);
      map.removeLayer(fillLayerId);
      map.removeLayer(strokeLayerId);
      
      map.removeSource(pointSourceId);
      map.removeSource(fillSourceId);
      map.removeSource(strokeSourceId);
    }
  }, []);

  return null;

}