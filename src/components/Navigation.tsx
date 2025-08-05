import React from 'react';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

/**
 * Responsive navigation component
 * Adapts to mobile screens with different layout
 */
const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/contacts', label: 'Contacts' },
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          variant={location.pathname === item.path ? 'outlined' : 'text'}
          size={isMobile ? 'small' : 'medium'}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;