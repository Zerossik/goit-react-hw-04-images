import { Item, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
export function ImageGalleryItem({ src, toggleIsOpen }) {
  return (
    <Item onClick={toggleIsOpen}>
      <Img src={src} alt="IMG" />
    </Item>
  );
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};
