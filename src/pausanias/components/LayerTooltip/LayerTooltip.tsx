import { TooltipProps } from '../../../peripleo';

import './LayerTooltip.css';

export const LayerTooltip = (props: TooltipProps) => {

  const { title } = props.feature.properties;

  return (
    <div className="pausanias-layer-tooltip">
      {title}
    </div>
  )

}