import { useEffect, useRef, useState } from 'react';
import CETEI from 'CETEIcean';

import './TEI.css';

interface TEIProps {

  src: string;

  onLoad(placeNames: Element[]): void;

  onViewportChange(arg: { entered: Element[], left: Element[] }): void;

}

/** Helper to compare sets by value **/
const equalLists = (al: any[], bl: any[]) => {
  if (al.length !== bl.length) return false;
  
  for (let idx = 0; idx < al.length; idx++) {
    if (al[idx] !== bl[idx])
      return false;
  }

  return true;
}

export const TEIView = (props: TEIProps) => {

  const el = useRef<HTMLDivElement>(null);

  const [ visibleSections, setVisibleSections ] = useState([]);

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    // Split entries into entered vs. left 
    const entriesEntered = entries.filter(e => e.isIntersecting);
    const entriesLeft = entries.filter(e => !e.isIntersecting);

    // Keep track of current TEI sections intersecting the view
    const sections = entriesEntered.map(e => e.target.closest('tei-div'));

    if (!equalLists(sections, visibleSections))
      setVisibleSections(sections);

    // Poor-mans garbage collection
    /*
    window.setTimeout(() => {
      const garbage = entriesEntered
        .filter(t => !isInViewRange(t.entry.target, elem.current.parentNode));

      if (garbage.length > 0 )
        props.onAnnotationsChanged({ 
          enteredView: [], 
          leftView: garbage.map(t => t.resolved) 
        });
    }, 1000);
    */

    props.onViewportChange({
      entered: entriesEntered.map(e => e.target),
      left: entriesLeft.map(e => e.target)
    });
  }

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Node) => {
      el.current.appendChild(data);

      const placeNames = Array.from(document.querySelectorAll('tei-body tei-placename'));

      // Init intersection observer
      const observer = new IntersectionObserver(onIntersect, {
        root: el.current.parentElement
      });
  
      placeNames.forEach(p => observer.observe(p));

      props.onLoad(placeNames);
    });
  }, []);

  return (
    <div ref={el} />
  )

}