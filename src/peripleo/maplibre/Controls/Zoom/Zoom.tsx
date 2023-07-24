import { Minus, Plus } from '@phosphor-icons/react';
import { useMap } from '../../Map';

export const Zoom = () => {

  const map = useMap();

  const onZoom = (inc: number) => () => {
    map.easeTo({ zoom:  map.getZoom() + inc });
  }
  
  return (
    <div className="p6o-zoom">
      <button 
        className="p6o-control p6o-zoom-in"
        tabIndex={31}
        aria-label="Zoom in"
        onClick={onZoom(1)}>
        <Plus />
      </button>

      <button 
        className="p6o-control p6o-zoom-out"
        tabIndex={32}
        aria-label="Zoom out"
        onClick={onZoom(-1)}>
        <Minus />
      </button>
    </div>
  )

}