import { ReactElement } from 'react';
import { animated, useTransition } from 'react-spring';
import { ScrollingList } from './ScrollingList';
import { StaticList } from './StaticList';

export interface PopupListProps<T extends { id: string }> {

  card(props: { item: T, index: number, delay: number }): ReactElement;

  height?: number; 

  items: T[];

  marginBottom?: number,

  of?: string;

  onClose?(): void;

  onScroll?(lastIndex: number): void;

  padding?: number | [number, number];

  scrollAfter?: number;

}

export const PopupList = <T extends { id: string }>(props: PopupListProps<T>) => {

  const scrollAfter = props.scrollAfter || 3;
  
  const transition = useTransition([props.items], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: props.items.length > 0 ? undefined : { opacity: 0 },
    config: {
      duration: 250
    }
  });

  return (
    transition((style, items) => (
      items.length > scrollAfter ? (
        <animated.div style={style}>
          <ScrollingList 
            card={props.card}
            items={items}
            of={props.of}
            onClose={props.onClose} 
            onScroll={props.onScroll} />
        </animated.div>
      ) : (
        <animated.div style={style}>
          <StaticList
            card={props.card}
            items={items} 
            onClose={props.onClose} />
        </animated.div>
      )
  )))
  
}