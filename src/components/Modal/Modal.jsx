import { Backdrop, ModalWrap } from './Modal.styled';
import { React, Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.modalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalClose);
  }

  modalClose = evt => {
    const { toggleIsOpen } = this.props;
    if (evt.code === 'Escape') {
      toggleIsOpen(null);
    }
  };

  handleBackdropClick = evt => {
    const { toggleIsOpen } = this.props;
    if (evt.currentTarget === evt.target) {
      toggleIsOpen(null);
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalWrap>{children}</ModalWrap>
      </Backdrop>,
      document.getElementById('modal')
    );
  }
}
Modal.propTypes = {
  toggleIsOpen: PropTypes.func.isRequired,
};
