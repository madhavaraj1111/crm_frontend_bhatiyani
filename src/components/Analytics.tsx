import React from 'react';
import { Bar } from 'react-chartjs-2';
import useContactStore from '../store/useContactStore';
import { Typography, Paper, Box } from '@mui/material';

const Analytics: React.FC = () => {
  const { contacts } = useContactStore();

  const companyCounts: Record<string, number> = {};
  contacts.forEach((c) => {
    companyCounts[c.company] = (companyCounts[c.company] || 0) + 1;
  });

  const data = {
    labels: Object.keys(companyCounts),
    datasets: [{
      label: 'Contacts per Company',
      data: Object.values(companyCounts),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Analytics by Company</Typography>
      <Box sx={{ height: 400 }}><Bar data={data} /></Box>
    </Paper>
  );
};

export default Analytics;
