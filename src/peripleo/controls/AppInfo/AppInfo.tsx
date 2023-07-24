import React, { useState } from 'react';
import { Info } from '@phosphor-icons/react';
import { Modal } from '../Modal';

import './AppInfo.css';

export type AppInfoProps = {

  children: React.ReactElement

  className?: string

}

export const AppInfo = (props: AppInfoProps) => {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button 
        className="p6o-control p6o-app-info-trigger"
        aria-label="Information"
        onClick={() => setModalOpen(true)}>
        <Info />
      </button>

      {modalOpen && (
        <Modal
          closeButton
          className={props.className}
          onClose={() => setModalOpen(false)}>
          {props.children}
        </Modal>
      )}
    </>
  )

}