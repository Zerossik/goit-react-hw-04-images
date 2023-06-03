import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export function Spiner({ isLoading }) {
  return (
    <Dna
      visible={isLoading}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}
Spiner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
