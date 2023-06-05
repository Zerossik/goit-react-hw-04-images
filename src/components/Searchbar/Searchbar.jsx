import { useState } from 'react';
import {
  SearchbarEl,
  SearchbarInput,
  SerchbarButton,
  SearchForm,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [inputValue, setinputValue] = useState('');

  const handlerSubmit = evt => {
    evt.preventDefault();
    if (inputValue === '') {
      alert('Please enter a search query');
      return;
    }
    onSubmit(inputValue.trim());
    setinputValue('');
  };

  return (
    <SearchbarEl>
      <SearchForm onSubmit={handlerSubmit}>
        <SerchbarButton type="submit">
          <span>Search</span>
        </SerchbarButton>

        <SearchbarInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target: { value } }) => setinputValue(value)}
          value={inputValue}
        />
      </SearchForm>
    </SearchbarEl>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
