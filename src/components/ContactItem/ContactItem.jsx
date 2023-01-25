import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number }) => {
  return (
    <p className={css.contact}>
      {name}:<span className={css.number}> {number}</span>
    </p>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
