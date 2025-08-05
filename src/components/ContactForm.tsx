import React, { useState } from 'react';
import { Paper, TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

interface ContactFormProps {
  onContactAdded: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contacts', formData);
      setFormData({ name: '', email: '', phone: '', company: '' });
      onContactAdded();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Add Contact</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Name" value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Phone" value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Company" value={formData.company} 
              onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Add Contact</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;