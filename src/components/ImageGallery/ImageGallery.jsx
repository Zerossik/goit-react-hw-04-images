import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ images, toggleIsOpen }) {
  return (
    <List>
      {images.map(({ webformatURL }, index) => (
        <ImageGalleryItem
          key={index}
          src={webformatURL}
          toggleIsOpen={() => toggleIsOpen(index)}
        />
      ))}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};
