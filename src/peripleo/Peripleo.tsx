import { ReactNode } from 'react';
import { SelectionProvider,  SearchProvider } from './state';

import './index.css';

export interface PeripleoProps {
  
  children: ReactNode;

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