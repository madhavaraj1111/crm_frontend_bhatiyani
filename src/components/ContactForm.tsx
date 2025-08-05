// ContactForm.tsx
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { 
  Paper, TextField, Button, Typography, Box, Alert, Fade,
  InputAdornment, Divider
} from '@mui/material';
import { 
  Person, Email, Phone, Business, Save, Clear, CheckCircle 
} from '@mui/icons-material';
import useContactStore from '../store/useContactStore';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '' 
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addContact } = useContactStore();

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await addContact(form);
      setForm({ name: '', email: '', phone: '', company: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      onSuccess?.();
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setForm({ name: '', email: '', phone: '', company: '' });
    setErrors({});
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Paper sx={{ 
      p: 4, 
      borderRadius: 3, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      border: '1px solid',
      borderColor: 'primary.100'
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Add New Contact
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Fill in the details to add a new contact to your CRM
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Success Alert */}
      <Fade in={showSuccess}>
        <Alert 
          severity="success" 
          icon={<CheckCircle />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          Contact added successfully!
        </Alert>
      </Fade>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={form.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={form.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone || 'Optional'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Company"
              value={form.company}
              onChange={handleChange('company')}
              helperText="Optional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          <Grid size={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleClear}
                startIcon={<Clear />}
                sx={{ borderRadius: 2 }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={<Save />}
                sx={{ 
                  borderRadius: 2,
                  minWidth: 120,
                  background: 'linear-gradient(45deg, #1976d2, #1565c0)'
                }}
              >
                {isSubmitting ? 'Adding...' : 'Add Contact'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;