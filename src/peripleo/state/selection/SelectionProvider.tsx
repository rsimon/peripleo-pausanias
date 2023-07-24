import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useSearch } from '../search';

export type SelectionContextState = [

  any | null,

  (selection: any | null) => void

]

export const SelectionContext = createContext<SelectionContextState>([null, null]);

export const SelectionProvider = <T extends any>(props: { children: ReactNode }) => {

  const [selection, setSelection] = useState<T | null>(null);

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

export const useSelectionState = <T extends any>() => {
  return useContext(SelectionContext) as [T, (selection: T) => void];
}

export const useSelectionValue = <T extends any>() => {
  const [ selection, ] = useContext(SelectionContext);
  return selection as T;
}