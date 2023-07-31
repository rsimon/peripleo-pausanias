import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import { useDebounce } from 'usehooks-ts';
import { useSearch } from '../../peripleo/state';
import { useTrackViewport } from './useTrackViewport';

import './TEIView.css';

interface TEIViewProps {

  src: string;

  onLoad(placeNames: Element[]): void;

}

export const TEIView = (props: TEIViewProps) => {

  const { setFilter } = useSearch();

  const [visible, setVisible] = useState<Element[]>([]);

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
    setFilter({ name: 'visible-places', value: debouncedVisible });
  }, [debouncedVisible, setFilter]);

  return (
    <div ref={ref} />
  )

}