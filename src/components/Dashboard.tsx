import React, { useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Charts from "./Charts";

const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
  console.log('Refreshing contacts...');
  // ContactList will handle its own refresh
};

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        CRM Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ContactForm onContactAdded={handleRefresh} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Analytics</Typography>
            <Charts />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ContactList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
