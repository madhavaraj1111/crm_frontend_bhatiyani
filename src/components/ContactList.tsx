import React, { useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import useContactStore from '../store/useContactStore';

const ContactList: React.FC = () => {
  const { contacts, fetchContacts, deleteContact } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Contacts</Typography>
      <ContactForm />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell><TableCell>Email</TableCell>
              <TableCell>Phone</TableCell><TableCell>Company</TableCell><TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.company}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteContact(c.id)}><Delete /></IconButton>
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

import ContactForm from './ContactForm';
