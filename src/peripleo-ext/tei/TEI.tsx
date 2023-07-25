import { useEffect, useRef } from 'react';
import CETEI from 'CETEIcean';

import './TEI.css';

interface TEIProps {

  src: string;

}

export const TEI = (props: TEIProps) => {

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Node) =>
      el.current.appendChild(data));
  }, []);

  return (
    <div ref={el}></div>
  )

}