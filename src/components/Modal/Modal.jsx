import { Backdrop, ModalWrap } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export function Modal({ toggleIsOpen, children }) {
  useEffect(() => {
    const modalClose = evt => {
      if (evt.code === 'Escape') {
        toggleIsOpen(null);
      }
    };
    window.addEventListener('keydown', modalClose);
    return () => {
      window.removeEventListener('keydown', modalClose);
    };
  }, [toggleIsOpen]);

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
