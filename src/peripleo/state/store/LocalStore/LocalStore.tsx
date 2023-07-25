import { ReactNode } from 'react';
import { Place } from '../Place';
import { Trace } from '../Trace';

interface LocalStoreProps<T extends unknown> {

  children: ReactNode;

  places: Place[];

  traces: Trace<T>[];

}

export const LocalStore = <T extends unknown>(props: LocalStoreProps<T>) => {

  return props.children;

}