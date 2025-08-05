// src/store/useContactStore.ts
import { create } from 'zustand';
import api from '../api/axios';
import type { Contact,ContactInput } from '../types/contact';

interface ContactState {
  contacts: Contact[];
  fetchContacts: () => void;
  addContact: (contact: ContactInput) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
}

const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  
  fetchContacts: async () => {
    try {
      const res = await api.get<Contact[]>('/contacts');
      set({ contacts: res.data });
    } catch (err) {
      console.error('Fetch contacts error:', err);
    }
  },

  addContact: async (contact) => {
    try {
      await api.post('/contacts', contact);
      const res = await api.get<Contact[]>('/contacts');
      set({ contacts: res.data });
    } catch (err) {
      console.error('Add contact error:', err);
    }
  },

  deleteContact: async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error('Delete contact error:', err);
    }
  },
}));

export default useContactStore;
