export const initialStore = () => {
  return {
    contacts: [],
    agendaSlug: "mi_agenda_jaem97",
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      };
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };
    default:
      throw Error('Unknown action.');
  }
}