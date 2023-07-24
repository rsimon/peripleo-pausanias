import { ReactElement, useEffect, useRef } from 'react';
import { PopupProps } from './PopupProps';
import { moveIntoView } from '../map';

import './PopupContainer.css';
import { useSearch } from '../state';

export type PopupContainerProps = PopupProps & {

  popup(props: PopupProps): ReactElement;

}

export const PopupContainer = (props: PopupContainerProps) => {

  const { popup, ...rest } = props;

  const { map, selected } = rest;

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected)
      return;

    const { offsetWidth} = el.current;

    const updatePosition = () => {
      // @ts-ignore
      const { coordinates } = selected.geometry;
  
      const xy = map.project(coordinates);
  
      const { height } = map._container.getBoundingClientRect();  

      const style = el.current.style;
      style.left = `${xy.x - offsetWidth / 2}px`;
      style.bottom = `${height - xy.y}px`;
    }

    const onMove = () =>  updatePosition();

    map.on('move', onMove);

    updatePosition();

    moveIntoView(map, el.current.getBoundingClientRect());

    return () => { 
      map.off('move', onMove)
    };
  }, [selected]);

  return (
    <div
      ref={el}
      className="p6o-popup-container">
      {popup(rest)}
    </div>
  )

}