import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';
import { HistogramConfig, createRenderer } from './Histogram';
import { SectionPicker } from './SectionPicker';

import './SectionNavigator.css';

interface SectionNavigatorProps {

  tei: Element;

  placesInViewport: Element[];

  histogramConfig?: HistogramConfig;

}

export const SectionNavigator = (props: SectionNavigatorProps) => {

  const { tei } = props;

  const canvas = useRef<HTMLCanvasElement>(null);

  const [sections, setSections] = useState<Section[]>([]); 

  const [renderer, setRenderer] = useState<ReturnType<typeof createRenderer>>(null);

  const [cursor, setCursor] = useState(-1);

  const totalPlaces = sections.reduce((count, { placenames }) =>
    count + placenames.length, 0);

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
      const renderer = createRenderer(canvas.current, sections, props.histogramConfig);
      setRenderer(renderer);
      renderer.render();
    }
  }, [ sections /* currentIdx, props.filter, props.selected */ ]);

  useEffect(() => {
    if (renderer)
      renderer.render(cursor);
  }, [renderer, cursor]);

  useEffect(() => {
    // Put the cursor at the first section in the viewport
    if (props.placesInViewport.length > 0) {
      const [ first, ] = props.placesInViewport;

      const section = first.closest('tei-div[subtype=section]');

      const cursor = sections.findIndex(s => s.element === section);
      setCursor(cursor); 
    }
  }, [ props.placesInViewport ]);

  const onJumpTo = ({ chapter, section }) => {
    const chapterEl = tei.querySelector(`tei-div[subtype="chapter"][n="${chapter}"]`);
    if (chapterEl) {
      const sectionEl = chapterEl.querySelector(`tei-div[subtype="section"][n="${section}"]`);
      if (sectionEl) {
        window.setTimeout(() => 
          sectionEl.scrollIntoView({ behavior: 'smooth' }), 1);
      }
    }
  }

  return (
    <div className="p6o-teiview-nav">
      <div className="p6o-teiview-histogram">
        <canvas ref={canvas} />
      </div>

      <div className="p6o-teiview-nav-bottom">
        <SectionPicker 
          cursor={cursor}
          sections={sections} 
          onJumpTo={onJumpTo}/>

        <div className="p6o-teiview-total">
          {totalPlaces.toLocaleString('en')} Place References
        </div>
      </div>
    </div>
  )

}