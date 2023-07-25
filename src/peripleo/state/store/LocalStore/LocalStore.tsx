import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Place, Trace, WithId, Store } from '../../Types';
import { createLocalStore } from './createLocalStore';

const LocalStoreContext = createContext<Store<WithId>>(null);

interface LocalStoreProps<T extends WithId> {

  children: ReactNode;

  places: Place[];

  traces: Trace<T>[];

}

export const LocalStore = <T extends WithId>(props: LocalStoreProps<T>) => {

  const { places, traces } = props;

  const [store, _] = useState<Store<T>>(createLocalStore());

  useEffect(() => {
    store.setData(places, traces);
  }, [places, traces]); 

  return ( 
    <LocalStoreContext.Provider value={store}>
      {props.children}
    </LocalStoreContext.Provider>
  )

}

export const useStore = <T extends WithId>() => useContext(LocalStoreContext) as Store<T>;