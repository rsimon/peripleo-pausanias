import { useEffect, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { TEIView } from './peripleo-ext';
import { useConfig } from './Config';
import {
  importTEITrace, 
  teiLayerStyle, 
  onSearch, 
  toGeoJSON,
  PlaceTooltip,
  LayerTooltip
} from './pausanias';
import { 
  Peripleo,
  BrowserStore, 
  Controls, 
  DraggablePanel, 
  FeatureCollection,
  SearchHandler 
} from './peripleo';
import {  
  LayerSwitcher,
  Map as MapLibreMap, 
  PulsingSelectionMarker, 
  SearchResultsLayer,
  StaticDataLayer,
  Zoom 
} from './peripleo/maplibre';

import './peripleo/theme/default/index.css';
import './peripleo-ext/theme/default/index.css';
import { Feature } from 'maplibre-gl';

// Data layer colors
const PALETTE = ['#0000ff'];

export const App = () => {

  const config = useConfig();

  const [places, setPlaces] = useState([]);

  const [trace, setTrace] = useState(null);

  const [layers, setLayers] = useState(new Map<string, FeatureCollection>());

  const loaded = places.length > 0 && trace;

  useEffect(() => {
    if (!config) return;

    fetch(config.gazetteer)
      .then(res => res.json())
      .then(geojson => setPlaces(geojson.features));

    if (config.layers) {
      Promise.all(config.layers.map(({ name, url }) =>
        fetch(url)
          .then(res => res.json())
          .then(data => ({ name, data })))
      ).then(layers => {
        const entries: [string, FeatureCollection][] = 
          layers.map(({ name, data }) => ([name, data as FeatureCollection ]));

        setLayers(new Map(entries));
      });
    }
  }, [config]);

  const onTEILoaded = (tei: Element) => {
    const placeNames = Array.from(tei.querySelectorAll('tei-body tei-placename'));
    setTrace(importTEITrace('Pausanias', placeNames));
  }

  return config && (
    <Peripleo>
      <BrowserStore
        places={loaded ? places : []}
        traces={loaded ? [trace] : []}>

        <SearchHandler onSearch={onSearch} />

        <MapLibreMap 
          style={config.map}
          popup={props => (
            <PlaceTooltip {...props} />
          )}>

          <PulsingSelectionMarker 
            duration={1000}
            size={80} 
            rgb={[246, 112, 86]} />

          <SearchResultsLayer 
            id="pleiades-places" 
            style={teiLayerStyle}
            toGeoJSON={toGeoJSON} />

          <Controls position="topright">
            <Zoom />

            <LayerSwitcher
              names={Array.from(layers.keys())}>

              {Array.from(layers.keys()).map((name, idx) => (
                <StaticDataLayer 
                  key={name}
                  id={name}
                  color={PALETTE[idx % PALETTE.length]}
                  data={layers.get(name)} 
                  tooltip={props => <LayerTooltip {...props} />} />
              ))}
            </LayerSwitcher>
          </Controls>
        </MapLibreMap>

        <DraggablePanel
          width={450}>
          <TEIView
            title={config.tei.name}
            src={config.tei.url}
            onLoad={onTEILoaded} />
        </DraggablePanel>
      </BrowserStore>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);