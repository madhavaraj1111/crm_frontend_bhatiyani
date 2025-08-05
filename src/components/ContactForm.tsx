import React, { useState } from 'react';
import { Paper, TextField, Button, Grid, Typography } from '@mui/material';
import useContactStore from '../store/useContactStore';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const { addContact } = useContactStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addContact(form);
    setForm({ name: '', email: '', phone: '', company: '' });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">Add Contact</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['name', 'email', 'phone', 'company'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField fullWidth label={field} value={(form as any)[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required={field === 'name' || field === 'email'}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Add</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
