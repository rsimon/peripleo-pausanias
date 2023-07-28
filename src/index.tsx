import { useEffect, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { Peripleo, BrowserStore, Controls, DraggablePanel, SearchHandler } from './peripleo';
import { Layer, Map, Zoom } from './peripleo/maplibre';
import { TEI } from './peripleo-ext';

import './peripleo/theme/default/index.css';
import './pausanias/index.css';

export const App = () => {

  const MAP_STYLE = document.querySelector('meta[name="map.style"]')?.getAttribute('content');

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('pleiades-referenced-places.lp.json')
      .then(res => res.json())
      .then(geojson => setPlaces(geojson.features));
  }, []);

  return (
    <Peripleo>
      <BrowserStore
        places={places}
        traces={[]}>

        <SearchHandler
          onSearch={({ store }) => {
            const all = store.allPlaces();

            return {
              total: all.length,
              items: all
            }
          }} />

        <Map 
          style={MAP_STYLE} 
          defaultBounds={[[14.3, 47.5], [17.1, 49.2]]}>

          <Layer 
            id="pleiades-places" 
            toGeoJSON={search => null} />
          
          <Controls position="topright">
            <Zoom />
          </Controls>

          <DraggablePanel>
            <TEI src="sample.tei.xml" />
          </DraggablePanel>
        </Map>
      </BrowserStore>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);