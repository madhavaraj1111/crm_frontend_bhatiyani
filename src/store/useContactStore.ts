import { create } from 'zustand';
import axios from 'axios';
import type { Contact } from '../types/contact';


interface ContactState {
  contacts: Contact[];
  fetchContacts: () => void;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
}

const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  fetchContacts: async () => {
    try {
      const res = await axios.get('http://localhost:3001/contacts');
      set({ contacts: res.data });
    } catch (err) {
      console.error('Fetch error:', err);
    }
  },
  addContact: async (contact) => {
    try {
      await axios.post('http://localhost:3001/contacts', {
        ...contact,
        createdAt: new Date().toISOString(),
      });
      const res = await axios.get('http://localhost:3001/contacts');
      set({ contacts: res.data });
    } catch (err) {
      console.error('Add error:', err);
    }
  },
  deleteContact: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error('Delete error:', err);
    }
  },
}));

export default useContactStore;
