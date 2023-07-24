import { CaretDown, CaretUp, X } from '@phosphor-icons/react';

export interface ScrollingListNavProps {

  index: number;

  total: number;

  of?: string;

  upDisabled: boolean;

  downDisabled: boolean;

  scrollBy(increment: number): void;

  onClose(): void;

}

export const ScrollingListNav = (props: ScrollingListNavProps) => {

  return ( 
    <div 
      className="p6o-scrolling-list-nav">

      <button 
        className="p6o-scrolling-list-nav-close"
        onClick={props.onClose}>
        <X />
      </button>

      {props.total > 99 ? (
        <span className="p6o-scrolling-list-nav-scroll-pos vertical">
          <span>{props.index}</span> <span className="of">{props.of || 'of'}</span> <span>{props.total}</span>
        </span>
      ) : (
        <span className="p6o-scrolling-list-nav-scroll-pos">
          {props.index}/{props.total}
        </span>
      )}

      <button 
        disabled={props.upDisabled}
        onClick={() => props.scrollBy(-2)}>
        <CaretUp />
      </button>

      <button
        disabled={props.downDisabled}
        onClick={() => props.scrollBy(2)}>
        <CaretDown />
      </button>
    </div>
  )

}