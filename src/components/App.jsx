import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const STORAGE_KEY = 'phonebook';

export default function App() {
  const [phonebook, setPhonebook] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phonebook));
  }, [phonebook]);

  const handleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    if (phonebook.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    setPhonebook(phonebook => [...phonebook, newContact]);
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return phonebook.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactId => {
    setPhonebook(phonebook => {
      return phonebook.filter(contact => contact.id !== contactId);
    });
  };

  const filteredContacts = getFiltredContacts();
  return (
    <div className={css.mainModule}>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter handleChange={handleChange} />
      <ContactList
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
}
