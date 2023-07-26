import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Place, Trace, WithId, Store } from '../../Types';
import { createLocalStore } from './createBrowserStore';
import { useSearch } from '../../search';

const BrowserStoreContext = createContext<Store<WithId>>(null);

interface BrowserStoreProps<T extends WithId> {

  children: ReactNode;

  places: Place[];

  traces: Trace<T>[];

}

export const BrowserStore = <T extends WithId>(props: BrowserStoreProps<T>) => {

  const { refreshSearch } = useSearch();

  const { places, traces } = props;

  const [store, setStore] = useState<Store<T>>(null);

  useEffect(() => {
    if (!store) {
      const s = createLocalStore<T>();
      s.setData(places, traces);
      setStore(s);
    } else {
      // Don't re-render empty changes
      if (places.length + places.length === 0 && store.isEmpty())
        return; 

      store.setData(places, traces);
      refreshSearch();
    }
  }, [places, traces, store]); 

  return ( 
    <BrowserStoreContext.Provider value={store}>
      {props.children}
    </BrowserStoreContext.Provider>
  )

}

export const useStore = <T extends WithId>() => useContext(BrowserStoreContext) as Store<T>;