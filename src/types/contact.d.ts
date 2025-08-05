// src/types/contact.d.ts
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  created_at: string; // ✅ snake_case from backend
  updated_at: string;
}

// src/types/contact.ts
export type ContactInput = Pick<Contact, 'name' | 'email' | 'phone' | 'company'>;