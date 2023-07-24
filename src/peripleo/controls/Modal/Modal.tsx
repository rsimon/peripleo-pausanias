import React, { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X } from '@phosphor-icons/react';

import './Modal.css';

export type ModalProps = {

  closeButton?: boolean;

  children: ReactNode;

  className?: string;

  onClose(): void;
  
}

export const Modal = (props: ModalProps) => {

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape')
        props.onClose();
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const onClick = (evt: React.MouseEvent) => {
    if (evt.target === el.current)
      props.onClose();
  }

  return ReactDOM.createPortal(
    <div 
      ref={el}
      className={props.className ? `p6o-modal-bg ${props.className}` : 'p6o-modal-bg'} 
      onClick={onClick}>

      {props.closeButton && (
        <button
          className="p6o-modal-close"
          onClick={props.onClose}>
          <X />
        </button>
      )}
      
      <article className="p6o-modal">
        {props.children}
      </article>
    </div>,

    document.body
  )

}