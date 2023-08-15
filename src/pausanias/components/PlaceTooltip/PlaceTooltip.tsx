import { PopupProps } from '../../../peripleo';

import './PlaceTooltip.css';

export const PlaceTooltip = (props: PopupProps) => {

  const { title } = props.selected.properties;

  return (
    <div className="pausanias-place-tooltip">
      {title}
    </div>
  )

}