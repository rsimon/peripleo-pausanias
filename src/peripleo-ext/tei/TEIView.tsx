import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import Switch from 'react-switch';
import { useDebounce } from 'usehooks-ts';
import { useSearch, useSelectionValue, useStore } from '../../peripleo/state';
import { useTrackViewport } from './useTrackViewport';

import './TEIView.css';

// Shorthand to add a CSS class to the element for the annotation
const addClass = (id: string, cls: string) => {
  const elem = document.getElementById(id);

  if (elem)
    elem.classList.add(cls);
}

interface TEIViewProps {

  title: string;

  src: string;

  onLoad(placeNames: Element[]): void;

}

export const TEIView = (props: TEIViewProps) => {

  const { clearFilter, getFilter, setFilter } = useSearch();

  const selection = useSelectionValue();

  const store = useStore();

  const [visible, setVisible] = useState<Element[]>([]);

  const [showAll, setShowAll] = useState(false);

  const debouncedVisible = useDebounce<Element[]>(visible, 20);

  const onViewportChange = ({ entered, left}) =>
    setVisible(visible => ([
      ...visible.filter(el => !left.includes(el)),
      ...entered
    ]));

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

  useEffect(() => {
    if (showAll) {
      if (getFilter('visible-waypoints'))
        clearFilter('visible-waypoints');
    } else {
      const ids = debouncedVisible.map(el => el.getAttribute('xml:id'));
      setFilter({ name: 'visible-waypoints', value: ids });
    }
  }, [debouncedVisible, showAll]);

  // Selection changed
  useEffect(() => {
    if (!store)
      return;

    // Deselect
    ref.current.querySelectorAll('.p6o-tei-selected').forEach(elem => {
      elem.classList.remove('p6o-tei-selected');
      elem.classList.remove('p6o-tei-primary');
    });

    if (!selection)
      return; 

    const toSelect = store.getItemsAt(selection.id);
    toSelect.forEach(item => addClass(item.id, 'p6o-tei-selected'));
  }, [ store, selection ]);

  return (
    <article className="p6o-teiview-container">
      <header>
        <h1>{props.title}</h1>

        <div className="p6o-teiview-mode-switch">
          <span>All Places</span>

          <Switch 
            height={18}
            width={34}
            onColor="#ced0d1"
            offColor="#ced0d1"
            checkedIcon={false}
            uncheckedIcon={false}
            checked={!showAll}
            onChange={checked => setShowAll(!checked)} />
          <span>Places in View</span>
        </div>
      </header>

      <div className="p6o-tei-content" ref={ref} />
    </article>
  )

}