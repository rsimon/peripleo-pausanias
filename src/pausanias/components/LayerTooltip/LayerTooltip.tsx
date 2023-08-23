import { MapGeoJSONFeature } from 'maplibre-gl';

import './LayerTooltip.css';

interface LayerTooltipProps {

  features: MapGeoJSONFeature[];

}

export const LayerTooltip = (props: LayerTooltipProps) => {

  const { title } = props.features[0].properties;

  return (
    <div className="pausanias-layer-tooltip">
      {title}
    </div>
  )

}