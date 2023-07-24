import { createRoot } from 'react-dom/client';
import { Peripleo, Controls } from './peripleo';
import { Map, Zoom } from './peripleo/maplibre';

export const App = () => {

  const MAP_STYLE = document.querySelector('meta[name="map.style"]')?.getAttribute('content');

  return (
    <Peripleo>
      <Map 
        style={MAP_STYLE} 
        defaultBounds={[[14.3, 47.5], [17.1, 49.2]]}>
        
        <Controls.Container>
          <Controls.TopRight>
            <Zoom />
          </Controls.TopRight>
        </Controls.Container>
        <Zoom />
      </Map>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);