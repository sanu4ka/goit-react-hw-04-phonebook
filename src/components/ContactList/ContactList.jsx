import ContactItem from '../ContactItem/ContactItem';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {filteredContacts.map(({ name, id, number }) => (
        <li key={id} className={css.listItem}>
          <ContactItem name={name} number={number} />
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
