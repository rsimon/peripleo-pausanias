import { useEffect } from 'react';
import CETEI from 'CETEIcean';
import { useTrackViewport } from './useTrackViewport';

import './TEIView.css';

interface TEIViewProps {

  src: string;

  onLoad(placeNames: Element[]): void;

  onViewportChange(arg: { entered: Element[], left: Element[] }): void;

}

export const TEIView = (props: TEIViewProps) => {

  const { onViewportChange } = props;

  const { ref, startTracking } = useTrackViewport<HTMLDivElement>({ onViewportChange });

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Node) => {
      ref.current.appendChild(data);

      const placeNames = Array.from(document.querySelectorAll('tei-body tei-placename'));

      startTracking(placeNames);

      props.onLoad(placeNames);
    });
  }, []);

  return (
    <div ref={ref} />
  )

}