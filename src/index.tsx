import { useEffect, useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { Peripleo, BrowserStore, Controls, DraggablePanel, SearchHandler } from './peripleo';
import { Layer, Map, Zoom } from './peripleo/maplibre';
import { FeatureCollection, Item, Place } from './peripleo/Types';
import { TEIView } from './peripleo-ext';
import { PlaceReference, teiToTrace } from './pausanias/PlaceReference';

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

  const toGeoJSON = ({ result, store }): FeatureCollection => { 
    const byPlace = result.aggregations.byPlace.buckets;

    const features = byPlace.reduce((places, bucket: { label: string, count: number}) => {
      const place = store.getPlaceById(bucket.label);
      return place ? [...places, { 
        ...place,
        properties: {
          ...place.properties,
          occurrences: bucket.count
        }
      }] : places;
    }, [] as Place[]);

    return { type: 'FeatureCollection', features };
  }

  return (
    <Peripleo>
      <BrowserStore
        places={loaded ? places : []}
        traces={loaded ? [trace] : []}>

        <SearchHandler
          onSearch={({ args, store }) => {
            const all = store.allPlaces();

            const filter = args.filters?.find(f => f.name === 'visible-waypoints');

            if (filter) {
              const visibleReferences: Item<PlaceReference>[] = filter.value
                .map((id: string) => store.getItemById(id))
                // Import discareds references with no resolved place,
                // therefore some can be undefined
                .filter((item: Item<PlaceReference>) => item);

              // Aggregate by place ID
              const byPlace: { [key: string]: Item<PlaceReference>[] } = 
                visibleReferences.reduce((aggregated, item) => {
                  const places = item.body.value.map(v => v.id);

                  places.forEach(id => {
                    aggregated[id] = [...(aggregated[id] || []), item];
                  });

                  return aggregated;
                }, {});

              return {
                bounds: null,
                total: visibleReferences.length,
                items: visibleReferences,
                aggregations: { 
                  byPlace: { 
                    buckets: Object.entries(byPlace).map(([id, items]) => ({
                      label: id,
                      count: items.length
                    }))
                  }
                }
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