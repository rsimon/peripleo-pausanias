import { ReactElement, createContext, useContext, useEffect, useState } from 'react';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { useSearch } from '../search';

export type SelectionContextState = [

  MapGeoJSONFeature | null,

  (selection: MapGeoJSONFeature | null) => void

]

export const SelectionContext = createContext<SelectionContextState>([null, null]);

export const SelectionProvider = (props: { children: ReactElement}) => {

  const [selection, setSelection] = useState<MapGeoJSONFeature | null>(null);

  const { search } = useSearch();

  useEffect(() => {
    // Clear the selection if the search changes
    setSelection(null);
  }, [search.args]);

  return (
    <SelectionContext.Provider value={[selection, setSelection]}>
      {props.children}
    </SelectionContext.Provider>
  )

}

export const useSelectionState = () => useContext(SelectionContext);

export const useSelectionValue = () => {
  const [ selection, ] = useContext(SelectionContext);
  return selection;
}