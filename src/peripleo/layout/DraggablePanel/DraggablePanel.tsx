import { ReactNode, useRef } from 'react';
import { useDraggable } from '@neodrag/react';
import { CSSDimension } from '../Types';

import './DraggablePanel.css';

export interface DraggablePanelProps {

  children: ReactNode;

  className?: string;
  
  height?: CSSDimension;

  left?: number;

  top?: number; 

  width?: CSSDimension;

  onDragStart?(): void;

  onDragEnd?(): void;

}

export const DraggablePanel = (props: DraggablePanelProps) => {

  const { children, className, onDragStart, onDragEnd } = props;

  const height = props.height || '500px';

  const left = props.left || '20px';
  
  const top = props.left || '20px';

  const width = props.width || '400px';

  const ref = useRef<HTMLDivElement>(null);
  
  useDraggable(ref, { onDragStart, onDragEnd, cancel: 'button, .no-drag' });

  return (
    <div 
      ref={ref}
      style={{ top, left, width, height }}
      className={className ? `p6o-draggable-panel ${className}` : 'p6o-draggable-panel'}>
      {children}
    </div>
  )

}