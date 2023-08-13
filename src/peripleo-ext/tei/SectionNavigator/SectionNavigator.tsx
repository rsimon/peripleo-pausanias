import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';

interface SectionNavigatorProps {

  tei: Element;

  width: number;

  height: number;

}

export const SectionNavigator = (props: SectionNavigatorProps) => {

  const { tei } = props;

  const canvas = useRef<HTMLCanvasElement>(null);

  const [sections, setSections] = useState<Section[]>([]); 

  useEffect(() => {
    if (tei) {
      const divs = Array.from(tei.querySelectorAll('tei-div[subtype=section]'));

      const sections = divs.map(element => {
        const placenames = Array.from(element.querySelectorAll('tei-placename'));
        return { element , placenames };
      });

      setSections(sections);
    }    
  }, [tei]);

  return (
    <div className="p6o-teiview-histogram">
      <canvas ref={canvas} width={props.width} height={props.height} />
    </div>
  )

}