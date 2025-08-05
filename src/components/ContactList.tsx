import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

// Component to display and manage contact list
const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Fetch contacts from JSON server
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };


   const deleteContact = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3001/contacts/${id}`);
    fetchContacts();
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};
  
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Contacts
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>
                  <IconButton><Edit /></IconButton>
                  <IconButton onClick={() => deleteContact(contact.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ContactList;