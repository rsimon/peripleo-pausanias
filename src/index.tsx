import { useEffect, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { Peripleo, BrowserStore, Controls, DraggablePanel, SearchHandler } from './peripleo';
import { Layer, Map, Zoom } from './peripleo/maplibre';
import { FeatureCollection, Place } from './peripleo/Types';
import { TEIView } from './peripleo-ext';
import { teiToTrace } from './pausanias/PlaceReference';

import './peripleo/theme/default/index.css';
import './pausanias/index.css';

export const App = () => {

  const MAP_STYLE = document.querySelector('meta[name="map.style"]')?.getAttribute('content');

  const [places, setPlaces] = useState([]);

  const [trace, setTrace] = useState(null);

  const loaded = places.length > 0 && trace;

  useEffect(() => {
    fetch('pleiades-referenced-places.lp.json')
      .then(res => res.json())
      .then(geojson => setPlaces(geojson.features));
  }, []);

  const onTEILoaded = (placeNames: Element[]) =>
    setTrace(teiToTrace(placeNames));

  const toGeoJSON = ({ result }): FeatureCollection => { 
    return {
      type: 'FeatureCollection',
      features: result.items
    }
  }

  return (
    <Peripleo>
      <BrowserStore
        places={loaded ? places : []}
        traces={loaded ? [trace] : []}>

        <SearchHandler
          onSearch={({ args, store }) => {
            const all = store.allPlaces();

            const filter = args.filters?.find(f => f.name === 'visible-places');

            if (filter) {
              const visible: string[] = filter.value
                .map((el: Element) => el.getAttribute('ref'))
                .filter((str: string) => str)
                .map((id: string) => store.getPlaceById(id))
                .filter((p: Place) => p)

              return {
                bounds: null,
                total: visible.length,
                items: visible
              }
            } else {
              return {
                bounds: null,
                total: all.length,
                items: all
              }
            }
          }} />

        <Map 
          style={MAP_STYLE} 
          defaultBounds={[[14.3, 47.5], [17.1, 49.2]]}>

          <Layer 
            id="pleiades-places" 
            toGeoJSON={toGeoJSON} />
          
          <Controls position="topright">
            <Zoom />
          </Controls>
        </Map>

        <DraggablePanel>
          <TEIView
            src="sample.tei.xml" 
            onLoad={onTEILoaded} />
        </DraggablePanel>
      </BrowserStore>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);