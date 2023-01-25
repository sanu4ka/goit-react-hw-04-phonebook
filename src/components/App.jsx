import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './СontactList/СontactList';

const STORAGE_KEY = 'phonebook';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(STORAGE_KEY);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFiltredContacts();
    return (
      <div className={css.mainModule}>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} />
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
