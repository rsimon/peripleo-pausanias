import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import Switch from 'react-switch';
import { useDebounce } from 'usehooks-ts';
import { useSearch, useSelectionValue, useStore } from '../../peripleo/state';
import { useTrackViewport } from './useTrackViewport';

import './TEIView.css';

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
    console.log('to select', toSelect);

    /* 

    // Depending on selection, get linked or sibling annotations
    let toSelect = [];

    if (props.selected?.type === 'Annotation') {
      // If an annotation is selected, fetch all links in this annotation
      // and that get all other annotations linking to the same URI
      toSelect = siblingsTo(props.selected);

      // In addition, highlight *this* annotation extra and scroll into view 
      addClass(props.selected, 'primary')
        .scrollIntoView({ block: 'nearest', inline: 'nearest' });
    } else if (props.selected?.type === 'Feature') {
      // If a place is selected, fetch all annotations linked to it
      toSelect = linkedTo(props.selected);
    }

    // Select
    toSelect.forEach(annotation => addClass(annotation, 'selected'));
    */
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