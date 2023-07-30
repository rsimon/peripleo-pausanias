import { useEffect, useRef } from 'react';
import CETEI from 'CETEIcean';

import './TEI.css';
import { Item } from 'src/peripleo/state/Types';

interface TEIProps {

  src: string;

  onLoad(): void;

}

interface PlaceReference {

  quote: string;

  tags: string[];

}

const elementToItem = (el: Element): Item<PlaceReference> => {
  // Anotation ID
  const id = el.getAttribute('xml:id');

  // Place URI
  const ref = el.getAttribute('ref');

  const ana = el.getAttribute('ana');
  const tags = ana ? ana.split(' ') : [];

  return {
    id,
    type: 'Annotation',
    target: {
      type: 'Dataset',
      value: { 
        quote: el.textContent,
        tags
      }
    },
    body: ref ? {
      type: 'Dataset',
      value: [{ 
        id: ref 
      }]
    } : undefined
  };
}

export const TEI = (props: TEIProps) => {

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Node) => {
      el.current.appendChild(data);

      const placeNames = Array.from(document.querySelectorAll('tei-body tei-placename'));

      const items = placeNames.map(elementToItem).filter(i => i.body);

      console.log(items);
    });
  }, []);

  return (
    <div ref={el}></div>
  )

}