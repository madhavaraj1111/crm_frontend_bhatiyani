import React, { useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Paper } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import useContactStore from '../store/useContactStore';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
  Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { contacts, fetchContacts } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  const total = contacts.length;
  const companies = new Set(contacts.map(c => c.company)).size;
  const recent = contacts.filter(c =>
    new Date(c.createdAt || '') > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const barData = {
    labels: ['Total', 'Companies', 'Recent'],
    datasets: [{
      label: 'Stats',
      data: [total, companies, recent],
      backgroundColor: ['#1976d2', '#dc004e', '#4caf50'],
    }],
  };

  const doughnutData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [total * 0.8, total * 0.2],
      backgroundColor: ['#4caf50', '#f44336'],
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'CRM Analytics' },
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>CRM Dashboard</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <StatCard title="Total Contacts" value={total} color="#1976d2" />
        <StatCard title="Companies" value={companies} color="#dc004e" />
        <StatCard title="Recent Contacts" value={recent} color="#4caf50" />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">Contact Stats</Typography>
            <Box sx={{ height: 300 }}><Bar data={barData} options={chartOptions} /></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">Contact Status</Typography>
            <Box sx={{ height: 300 }}><Doughnut data={doughnutData} options={chartOptions} /></Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ background: color, color: 'white' }}>
      <CardContent>
        <Typography>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Dashboard;
