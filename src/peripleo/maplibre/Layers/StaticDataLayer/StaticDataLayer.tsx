import { ReactNode, useEffect, useState } from 'react';
import { MapGeoJSONFeature, MapMouseEvent, PointLike } from 'maplibre-gl';
import bbox from '@turf/bbox';
import { Feature, FeatureCollection } from '../../../Types';
import { CLICK_THRESHOLD, useMap } from '../../Map';
import { pointStyle, fillStyle, strokeStyle } from './styles';

interface StaticDataLayerProps {

  id: string;

  data?: FeatureCollection;

  color?: string;

  tooltip?(features: MapGeoJSONFeature[]): ReactNode;

}

const fc = (data?: Feature[]) => ({ 
  type: 'FeatureCollection', 
  features: data || []
});

export const StaticDataLayer = (props: StaticDataLayerProps) => {

  console.log('render');

  const map = useMap();

  const [hovered, setHovered] = useState<MapGeoJSONFeature | undefined>(undefined);

  const pointSourceId = `${props.id}-pt-source`;
  const pointLayerId = `${props.id}-pt`;

  const shapeSourceId = `${props.id}-shape-source`;
  const fillLayerId = `${props.id}-shape-fill`;
  const strokeLayerId = `${props.id}-shape-stroke`;

  const queryFeatures = (evt: MapMouseEvent) => {
    const map = evt.target;

    const bbox: [PointLike, PointLike] = [
      [evt.point.x - CLICK_THRESHOLD, evt.point.y - CLICK_THRESHOLD],
      [evt.point.x + CLICK_THRESHOLD, evt.point.y + CLICK_THRESHOLD]
    ];

    return map.queryRenderedFeatures(bbox)
      // @ts-ignore
      .filter(({ layer }) => layer.id === pointLayerId || layer.id === fillLayerId);
  }

  const onMapClicked = (evt: MapMouseEvent) => {
    // console.log('features', features);
  }

  const onMapHover = (evt: MapMouseEvent) => {
    const features = queryFeatures(evt);

    console.log('hover', Boolean(hovered), features.length);

    if (features.length > 0)
      setHovered(features[0]);
    else
      setHovered(undefined);
  }

  useEffect(() => {
    const geometry = fc(props.data?.features.filter(f => f.geometry));

    const points = 
      fc(geometry.features.filter(f => f.geometry?.type === 'Point'));

    const shapes =
      fc(geometry.features.filter(f => f.geometry?.type !== 'Point'));

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
      ...pointStyle({ color: props.color }),
      id: pointLayerId,
      source: pointSourceId
    });

    // @ts-ignore
    map.addLayer({
      ...fillStyle({ fill: props.color }),
      id: fillLayerId,
      source: shapeSourceId
    });

    // @ts-ignore
    map.addLayer({
      ...strokeStyle({ fill: props.color }),
      id: strokeLayerId,
      source: shapeSourceId
    });

    if (props.tooltip) {
      map.on('click', onMapClicked);
      map.on('mousemove', onMapHover);
    }

    const [minLon, minLat, maxLon, maxLat] = bbox(geometry);
    map.fitBounds([[minLon, minLat], [maxLon, maxLat]], { padding: 100 });

    return () => {
      if (props.tooltip) {
        map.off('click', onMapClicked);
        map.off('mousemove', onMapHover);
      }

      map.removeLayer(pointLayerId);
      map.removeLayer(fillLayerId);
      map.removeLayer(strokeLayerId);
      
      map.removeSource(pointSourceId);
      map.removeSource(shapeSourceId);
    }
  }, [props.tooltip]);

  return props.tooltip && hovered ? (
    props.tooltip([hovered])
  ) : null;

}