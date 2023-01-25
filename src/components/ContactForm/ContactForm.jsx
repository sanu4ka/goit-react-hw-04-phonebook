import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ContactForm({ handleSubmit }) {
  const [contactName, setName] = useState('');
  const [contactNumber, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value);
      return;
    }
    setNumber(value);
  };

  const onSubmiting = e => {
    e.preventDefault();
    handleSubmit(contactName, contactNumber);
    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={onSubmiting}>
      <input
        className={css.input}
        type="text"
        name="name"
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        className={css.input}
        type="tel"
        name="number"
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
