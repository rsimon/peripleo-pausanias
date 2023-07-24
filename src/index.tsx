import { createRoot } from 'react-dom/client';
import { Peripleo, Map, Zoom } from './peripleo';

export const App = () => {

  const MAP_STYLE = document.querySelector('meta[name="map.style"]')?.getAttribute('content');

  return (
    <Peripleo>
      <Map.MapLibre 
        style={MAP_STYLE} 
        defaultBounds={[[14.3, 47.5], [17.1, 49.2]]} />
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);