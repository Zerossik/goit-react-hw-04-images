import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/images-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spiner } from './Loader/Loader';
import style from './style.module.css';
import { Modal } from './Modal/Modal';

export function App() {
  const [query, setquery] = useState('');
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [images, setimages] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [imgIndex, setimgIndex] = useState(null);

  useEffect(() => {
    setimages([]);
  }, [query]);

  useEffect(() => {
    if (query !== '') {
      setisOpen(false);
      setisLoading(true);

      getImages(query, page)
        .then(({ data: { hits } }) => {
          if (hits) {
            setimages(prev => [...prev, ...hits]);
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => {
          setisLoading(false);
        });
    }
  }, [query, page]);

  const onSubmit = query => {
    setquery(query);
    setpage(1);
  };
  const handlerPageClick = () => {
    setpage(page + 1);
  };
  const toggleIsOpen = index => {
    setisOpen(!isOpen);
    setimgIndex(index);
  };

  return (
    <div className={style.wrap}>
      <Searchbar onSubmit={onSubmit} />

      {images.length === 0 && <Spiner isLoading={isLoading} />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} toggleIsOpen={toggleIsOpen} />
          {isLoading ? (
            <Spiner isLoading={true} />
          ) : (
            <Button text={'Load more'} onClick={handlerPageClick} />
          )}
        </>
      )}
      {isOpen && (
        <Modal toggleIsOpen={toggleIsOpen}>
          <img src={images[imgIndex].largeImageURL} alt="IMG" />
        </Modal>
      )}
    </div>
  );
}
