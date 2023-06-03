import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/images-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spiner } from './Loader/Loader';
import style from './style.module.css';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    images: [],
    isOpen: false,
    imgIndex: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({
        images: [],
        isOpen: false,
      });
    }
    if (
      (prevState.query !== query || prevState.page !== page) &&
      query !== ''
    ) {
      this.setState({
        isLoading: true,
      });

      getImages(query, page)
        .then(({ data: { hits } }) => {
          if (hits) {
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
            }));
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  onSubmit = query => {
    this.setState({ query, page: 1 });
  };
  handlerPageClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  toggleIsOpen = index => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      imgIndex: index,
    }));
  };

  render() {
    const { images, isLoading, isOpen, imgIndex } = this.state;
    return (
      <div className={style.wrap}>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length === 0 && <Spiner isLoading={isLoading} />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} toggleIsOpen={this.toggleIsOpen} />
            {isLoading ? (
              <Spiner isLoading={true} />
            ) : (
              <Button text={'Load more'} onClick={this.handlerPageClick} />
            )}
          </>
        )}
        {isOpen && (
          <Modal toggleIsOpen={this.toggleIsOpen}>
            <img src={images[imgIndex].largeImageURL} alt="IMG" />
          </Modal>
        )}
      </div>
    );
  }
}
