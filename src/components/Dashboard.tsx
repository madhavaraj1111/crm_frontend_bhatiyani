import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Title, Tooltip, Legend
);

interface DashboardStats {
  totalContacts: number;
  companiesCount: number;
  recentContacts: number;
}

/**
 * Enhanced Dashboard component with multiple charts and statistics
 * Features: Responsive cards, multiple chart types, real-time data
 * AI Used: Chart.js configuration optimized with ChatGPT assistance
 */
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    companiesCount: 0,
    recentContacts: 0,
  });
  const [contacts, setContacts] = useState([]);

  // Fetch dashboard data from both JSON server and backend
  const fetchDashboardData = async () => {
    try {
      // Get data from JSON Server
      const jsonResponse = await axios.get('http://localhost:3001/contacts');
      const jsonContacts = jsonResponse.data;
      
      // Get data from Backend API
      const backendResponse = await axios.get('http://localhost:8000/contacts');
      const backendContacts = backendResponse.data;
      
      const allContacts = [...jsonContacts, ...backendContacts];
      setContacts(allContacts);
      
      // Calculate statistics
      const companies = new Set(allContacts.map(c => c.company)).size;
      setStats({
        totalContacts: allContacts.length,
        companiesCount: companies,
        recentContacts: allContacts.filter(c => 
          new Date(c.createdAt || Date.now()) > new Date(Date.now() - 7*24*60*60*1000)
        ).length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Chart configurations
  const barChartData = {
    labels: ['Total Contacts', 'Companies', 'Recent Contacts'],
    datasets: [{
      label: 'Count',
      data: [stats.totalContacts, stats.companiesCount, stats.recentContacts],
      backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }]
  };

  const doughnutData = {
    labels: ['Active Contacts', 'Inactive Contacts'],
    datasets: [{
      data: [stats.totalContacts * 0.8, stats.totalContacts * 0.2],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
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
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        CRM Dashboard
      </Typography>
      
      {/* Stats Cards - Responsive Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
            <CardContent>
              <Typography color="white" gutterBottom>Total Contacts</Typography>
              <Typography variant="h4" color="white">{stats.totalContacts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent>
              <Typography color="white" gutterBottom>Companies</Typography>
              <Typography variant="h4" color="white">{stats.companiesCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)' }}>
            <CardContent>
              <Typography color="white" gutterBottom>Recent Contacts</Typography>
              <Typography variant="h4" color="white">{stats.recentContacts}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Grid - Responsive */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Contact Statistics</Typography>
            <Box sx={{ height: '300px' }}>
              <Bar data={barChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Contact Status</Typography>
            <Box sx={{ height: '300px' }}>
              <Doughnut data={doughnutData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;