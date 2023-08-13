import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';
import { renderHistogram } from './histogramRenderer';
import { HistogramConfig } from './HistogramConfig';

interface SectionNavigatorProps {

  tei: Element;

  width: number;

  height: number;

  histogramConfig?: HistogramConfig;

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

  useEffect(() => {
    if (sections) {
      renderHistogram(canvas.current, sections, props.histogramConfig);
    }
  }, [ sections /* currentIdx, props.filter, props.selected */ ]);

  return (
    <div className="p6o-teiview-histogram">
      <canvas ref={canvas} width={props.width} height={props.height} />
    </div>
  )

}