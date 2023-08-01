import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useSearch } from '../search';
import { Feature } from 'src/peripleo/Types';

export type SelectionContextState = [

  Feature | undefined,

  (selection?: Feature) => void

]

export const SelectionContext = createContext<SelectionContextState>([undefined, undefined]);

export const SelectionProvider = (props: { children: ReactNode }) => {

  const [selection, _setSelection] = useState<Feature | undefined>(undefined);

  const setSelection = (f?: Feature) => {
    if (f) {
      const id = f.id || f.properties.id;
      _setSelection(({ ...f, id }));
    } else {
      _setSelection(undefined);
    }
  }

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

export const useSelectionState = () => {
  return useContext(SelectionContext);
}

export const useSelectionValue = () => {
  const [ selection, ] = useContext(SelectionContext);
  return selection;
}