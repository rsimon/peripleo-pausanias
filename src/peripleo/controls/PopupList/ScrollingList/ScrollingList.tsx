import { ReactElement, useEffect, useRef, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { ScrollingListNav } from './ScrollingListNav';

import './ScrollingList.css';

// Size when entering/leaving
const MIN_SCALE = 0.86;

// Vertical offset when entering/leaving
const MAX_DY = 40;

// Pixel increment for one scroll step
const SCROLL_STEP = 90;

export interface ScrollingListProps<T extends { id: string }> {

  card(props: { item: T, index: number }): ReactElement;

  height?: number; 

  items: T[];

  marginBottom?: number,

  of?: string;

  onClose?(): void;

  onScroll?(lastIndex: number): void;

  padding?: number | [number, number];

}

export const ScrollingList = <T extends { id: string }>(props: ScrollingListProps<T>) => {

  const container = useRef<HTMLDivElement>();

  const paddingV = props.padding ? (Array.isArray(props.padding) ? props.padding[0] : props.padding) : 100;
  const paddingH = props.padding ? (Array.isArray(props.padding) ? props.padding[1] : props.padding) : 10;

  const marginBottom = props.marginBottom || -40;

  const [lastIndex, setLastIndex] = useState(0);

  const [isUpDisabled, setUpDisabled] = useState(true);
  const [isDownDisabled, setDownDisabled] = useState(false);

  const key = props.items.map(i => i.id).join();

  const scrollBy = (step: number) => {
    const el = container.current;
    el.scrollTo({ top: el.scrollTop + SCROLL_STEP * step, behavior: 'smooth' });
  }

  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => { 
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting) {
          // Is this element exiting (top of container) or entering (bottom)
          const isEntering = entry.boundingClientRect.y > entry.rootBounds.y;

          if (isEntering)
            setLastIndex(parseInt((entry.target as HTMLElement).dataset.index));

          el.style.opacity = `${Math.sqrt(ratio)}`;

          // Scale factor as a function of intersection ratio
          const scale = ratio * (1 - MIN_SCALE) + MIN_SCALE;
          const rotate = isEntering ? - 7 * (1 - ratio) : 7 * (1 - ratio);
          
          // Vertical offset
          const dy = MAX_DY - Math.sqrt(ratio) * MAX_DY;
          el.style.transform = `scale(${scale}) perspective(500px) rotateX(${rotate}deg) translateY(${isEntering ? -dy : dy}px)`;
          
          if (ratio > 0.9)
            el.style.zIndex = '1';
          else
            el.style.zIndex = '0';
        } else {
          el.style.opacity = '0';
        }
      });

      const { current } = container;
      if (current) {
        const from = Math.round(100 * current.scrollTop / current.scrollHeight);
        const to = Math.round(100 * (current.scrollTop + current.offsetHeight) / current.scrollHeight);

        setUpDisabled(from === 0);
        setDownDisabled(to === 100);
      }
    };

    const options = {
      root: container.current,
      rootMargin: '0px',
      threshold: Array.from({ length: 21 }, (v, i) => i * 0.05)
    }

    const observer = new IntersectionObserver(onIntersect, options);
    container.current.childNodes.forEach(el => observer.observe(el as Element));

    return () => observer.disconnect();
  }, [props.items]);

  useEffect(() => {
    props.onScroll && props.onScroll(lastIndex);
  }, [lastIndex]);

  const transitions = props.items.map((item, index) => ({
    key: item.id, 
    transition: useTransition([item], {
      from: { opacity: 0, y: 30 },
      enter: { opacity: 1, y: 0 },
      delay: Math.max(0, 100 - 50 * index),
      config: {
        duration: 120
      }
    })
  }));

  return (
    <div className="p6o-popup-list">
      <div 
        ref={container}
        key={key}
        className="p6o-scrolling-list-container"
        style={{
          height: props.height || 500,
          padding: `${paddingV}px ${paddingH}px`,
          marginBottom
        }}>

        {transitions.map(({ key, transition }, index) => (
          <div key={key} className="p6o-scrolling-list-card-container" data-index={index}>
            {transition((style, item) => (
              <animated.div style={style}>
                {props.card({ item, index })}
              </animated.div>
            ))}
          </div>
        ))}
      </div>

      <ScrollingListNav 
        index={lastIndex + 1}
        of={props.of}
        total={props.items.length}
        upDisabled={isUpDisabled}
        downDisabled={isDownDisabled}
        scrollBy={scrollBy} 
        onClose={props.onClose} />
    </div>
  )

}

