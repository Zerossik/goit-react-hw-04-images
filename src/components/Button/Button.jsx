import { Loadmore } from './Button.styled';
import PropTypes from 'prop-types';
export function Button({ text, onClick }) {
  return (
    <Loadmore type="button" onClick={onClick}>
      {text}
    </Loadmore>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
