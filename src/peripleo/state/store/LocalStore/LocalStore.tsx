import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Place } from '../Place';
import { Store } from '../Store';
import { Trace } from '../Trace';
import { createLocalStore } from './createLocalStore';

const LocalStoreContext = createContext<Store<unknown>>(null);

interface LocalStoreProps<T extends unknown> {

  children: ReactNode;

  places: Place[];

  traces: Trace<T>[];

}

export const LocalStore = <T extends unknown>(props: LocalStoreProps<T>) => {

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

export const useStore = () => useContext(LocalStoreContext);