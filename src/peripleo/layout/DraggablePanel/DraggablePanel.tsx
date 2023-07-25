import { ReactNode, useRef } from 'react';
import { useDraggable } from '@neodrag/react';

import './DraggablePanel.css';

export interface DraggablePanelProps {

  children: ReactNode;

  className?: string;

  onDragStart?(): void;

  onDragEnd?(): void;

}

export const DraggablePanel = (props: DraggablePanelProps) => {

  const { children, className, onDragStart, onDragEnd } = props;

  const ref = useRef<HTMLDivElement>(null);
  
  useDraggable(ref, { onDragStart, onDragEnd, cancel: 'button, .no-drag' });

  return (
    <div 
      ref={ref}
      className={className ? `p6o-draggable-panel ${className}` : 'p6o-draggable-panel'}>
      {children}
    </div>
  )

}