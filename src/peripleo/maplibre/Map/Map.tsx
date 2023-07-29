import { useEffect, useRef, useState } from 'react';
import { MapGeoJSONFeature, Map as MapLibre, MapMouseEvent, PointLike } from 'maplibre-gl';
import { MapContext } from './MapContext';
import { MapProps } from './MapProps';
import { PopupContainer } from '../Popup';
import { SearchStatus, useSearch, useSelectionState } from '../../state';

import 'maplibre-gl/dist/maplibre-gl.css';

const CLICK_THRESHOLD = 10;

export const Map = (props: MapProps) => {

  const ref = useRef<HTMLDivElement>(null);

  const { search } = useSearch();

  const [map, setMap] = useState<MapLibre>(null);

  const [loaded, setLoaded] = useState(false);

  const [selected, setSelected] = useSelectionState<MapGeoJSONFeature>();

  const onMapClicked = (evt: MapMouseEvent) => {
    const map = evt.target;

    const bbox: [PointLike, PointLike] = [
      [evt.point.x - CLICK_THRESHOLD, evt.point.y - CLICK_THRESHOLD],
      [evt.point.x + CLICK_THRESHOLD, evt.point.y + CLICK_THRESHOLD]
    ];

    const features = map.queryRenderedFeatures(bbox)
      // @ts-ignore
      .filter(feature => feature.layer.metadata?.interactive);

    if (features.length > 0)
      // TODO pick feature with smallest area?
      setSelected(features[0]);
    else 
      setSelected(null);
  };

  useEffect(() => {
    if (loaded || search.status !== SearchStatus.OK)
      return;

    console.log('Initializing map');
    
    const map = new MapLibre({
      container: ref.current,
      style: props.style,

      // TODO retrieve initial bounds from search result
      bounds: props.defaultBounds
    });

    if (props.disableScrollZoom)
      map.scrollZoom.disable();

    map.on('click', onMapClicked);

    setMap(map);
    setLoaded(true);
  }, [search, loaded]);

  return (
    <div 
      ref={ref}
      className="p6o-map-container">

      <MapContext.Provider value={map}>
        {map && (
          <>
            {props.children}

            {props.popup && (
              <PopupContainer 
                map={map}
                selected={selected}
                popup={props.popup} 
                onClose={() => setSelected(null)} />
            )}
          </>
        )}
      </MapContext.Provider>

    </div>
  )

}