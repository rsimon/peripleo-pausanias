import { useEffect, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { Peripleo, BrowserStore, Controls, DraggablePanel, SearchHandler } from './peripleo';
import { Layer, Map, Zoom } from './peripleo/maplibre';
import { TEIView } from './peripleo-ext';
import { importTEITrace, teiLayerStyle, onSearch, toGeoJSON } from './pausanias';

import './peripleo/theme/default/index.css';
import './peripleo-ext/theme/default/index.css';


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
    setTrace(importTEITrace('Pausanias', placeNames));

  return (
    <Peripleo>
      <BrowserStore
        places={loaded ? places : []}
        traces={loaded ? [trace] : []}>

        <SearchHandler onSearch={onSearch} />

        <Map 
          style={MAP_STYLE} 
          defaultBounds={[[14.3, 47.5], [17.1, 49.2]]}>

          <Layer 
            id="pleiades-places" 
            style={teiLayerStyle}
            toGeoJSON={toGeoJSON} />
          
          <Controls position="topright">
            <Zoom />
          </Controls>
        </Map>

        <DraggablePanel
          width={450}>
          <TEIView
            title="Pausanias Book 1"
            src="pausanias-book1.tei.xml" 
            onLoad={onTEILoaded} />
        </DraggablePanel>
      </BrowserStore>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);