import { ReactNode } from 'react';

export const DraggablePanel = (props: { children: ReactNode }) => {

  return (
    <div className="p6o-draggable-panel">
      {props.children}
    </div>
  )

}