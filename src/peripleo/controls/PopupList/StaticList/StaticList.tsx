import { ReactElement } from 'react';
import { animated, useTransition } from 'react-spring';
import { X } from '@phosphor-icons/react';

import './StaticList.css';

export interface StaticListProps<T extends { id: string}> {

  card(props: { item: T, index: number }): ReactElement;

  items: T[];

  onClose?(): void;

}

export const StaticList = <T extends { id: string }>(props: StaticListProps<T>) => {

  const transitions = props.items.map((item, index) => ({
    key: item.id, 
    transition: useTransition([item], {
      from: { opacity: 0, y: 30 },
      enter: { opacity: 1, y: 0 },
      delay: 100 - 50 * index,
      config: {
        duration: 50
      }
    })
  }));

  return (
    <div className="p6o-popup-list">
      {transitions.map(({ key, transition }, index) => (
        <div key={key} className="p6o-static-list-card-container">
          {transition((style, item) => (
            <animated.div  
              style={style}>
              {props.card({ item, index })}
            </animated.div>
          ))}
        </div>
      ))}

      {props.items?.length > 0 && (
        <button className="p6o-static-list-close" onClick={props.onClose}>
          <X />
        </button>
      )}
    </div>
  );

}