import { Component } from 'react';
import {
  SearchbarEl,
  SearchbarInput,
  SerchbarButton,
  SearchForm,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handlerChange = evt => {
    this.setState({
      inputValue: evt.target.value,
    });
  };
  handlerSubmit = evt => {
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    evt.preventDefault();
    if (inputValue === '') {
      alert('Please enter a search query');
      return;
    }
    onSubmit(inputValue.trim());
    this.resetInput();
  };
  resetInput = () => {
    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <SearchbarEl>
        <SearchForm onSubmit={this.handlerSubmit}>
          <SerchbarButton type="submit">
            <span>Search</span>
          </SerchbarButton>

          <SearchbarInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handlerChange}
            value={this.state.inputValue}
          />
        </SearchForm>
      </SearchbarEl>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
