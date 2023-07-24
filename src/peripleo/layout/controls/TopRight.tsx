import { ReactNode } from 'react';

export const TopRight = (props: { children: ReactNode }) => {

  return (
    <div className="p6o-controls-container-top-right">
      {props.children}
    </div>
  )

}