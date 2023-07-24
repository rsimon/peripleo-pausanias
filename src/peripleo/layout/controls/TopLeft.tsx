import { ReactNode } from 'react';

export const TopLeft = (props: { children: ReactNode }) => {

  return (
    <div className="p6o-controls-container-top-left">
      {props.children}
    </div>
  )

}