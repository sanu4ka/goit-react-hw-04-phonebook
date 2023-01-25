import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ handleChange }) => {
  return (
    <div className={css.filter}>
      <p className={css.title}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={handleChange}
      />
    </div>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Filter;
