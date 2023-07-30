import { useEffect, useRef } from 'react';
import CETEI from 'CETEIcean';

import './TEI.css';

interface TEIProps {

  src: string;

  onLoad?(placeNames: Element[]): void;

}

export const TEI = (props: TEIProps) => {

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Node) => {
      el.current.appendChild(data);
      const placeNames = Array.from(document.querySelectorAll('tei-body tei-placename'));
      props.onLoad && props.onLoad(placeNames);
    });
  }, []);

  return (
    <div ref={el}></div>
  )

}