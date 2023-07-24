import { ReactElement, createContext, useContext } from 'react';
import { MapLibre } from './MapLibre';
import { Map as map } from 'maplibre-gl';
import { PopupProps } from '../popup';

export interface MapProps {

  style: string; 
  
  defaultBounds: [[number, number], [number, number]];

  children: ReactElement | ReactElement[] | never[];

  disableScrollZoom?: boolean;

  popup?(props: PopupProps): ReactElement;

}

export const Map = { MapLibre };

export const MapContext = createContext<map>(null);

export const useMap = () => useContext(MapContext);