import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Place, Trace, WithId, Store } from '../../Types';
import { createLocalStore } from './createBrowserStore';

const BrowserStoreContext = createContext<Store<WithId>>(null);

interface BrowserStoreProps<T extends WithId> {

  children: ReactNode;

  places: Place[];

  traces: Trace<T>[];

}

export const BrowserStore = <T extends WithId>(props: BrowserStoreProps<T>) => {

  const { places, traces } = props;

  const [store, _] = useState<Store<T>>(createLocalStore());

  useEffect(() => {
    store.setData(places, traces);
  }, [places, traces]); 

  return ( 
    <BrowserStoreContext.Provider value={store}>
      {props.children}
    </BrowserStoreContext.Provider>
  )

}

export const useStore = <T extends WithId>() => useContext(BrowserStoreContext) as Store<T>;