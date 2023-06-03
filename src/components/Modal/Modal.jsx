import { Backdrop, ModalWrap } from './Modal.styled';
import { React, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export function Modal({ toggleIsOpen, children }) {
  // componentWillUnmount() {
  //   // меняет на useEffect c return
  //   window.removeEventListener('keydown', this.modalClose);
  // }

  const modalClose = evt => {
    console.log('+');
    if (evt.code === 'Escape') {
      toggleIsOpen(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', modalClose);
    return () => {
      window.removeEventListener('keydown', modalClose);
    };
  }, []);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      toggleIsOpen(null);
    }
  };
  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWrap>{children}</ModalWrap>
    </Backdrop>,
    document.getElementById('modal')
  );
}
Modal.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};
