import { ReactElement } from 'react';
import { SelectionProvider,  SearchProvider } from './state';

export interface PeripleoProps {
  
  children: ReactElement;

}

export const Peripleo = (props: PeripleoProps) => {

  return (
    <SearchProvider>
      <SelectionProvider>
        {props.children}
      </SelectionProvider>
    </SearchProvider>
  )

}