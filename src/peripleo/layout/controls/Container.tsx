import { ReactNode } from 'react';

export const Container = (props: { children: ReactNode }) => {

  return (
    <div className="p6o-controls-container">
      {props.children}
    </div>
  )

}