import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Bar, Doughnut} from 'react-chartjs-2';
import useContactStore from '../store/useContactStore';
import { 
 Typography, Paper, Box, Card, CardContent, Chip, Avatar,
 LinearProgress, Divider
} from '@mui/material';
import {
 TrendingUp, Business, People, Timeline, Assessment,
 WorkOutline, EmailOutlined, PhoneOutlined
} from '@mui/icons-material';
import {
 Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
 PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics: React.FC = () => {
 const { contacts, fetchContacts } = useContactStore();

 useEffect(() => {
   fetchContacts();
 }, []);

 // Company distribution
 const companyCounts: Record<string, number> = {};
 contacts.forEach((c) => {
   const company = c.company || 'No Company';
   companyCounts[company] = (companyCounts[company] || 0) + 1;
 });

 // Contact completion analysis
 const contactsWithPhone = contacts.filter(c => c.phone).length;
 const contactsWithCompany = contacts.filter(c => c.company).length;
 const completionRate = contacts.length > 0 ? 
   ((contactsWithPhone + contactsWithCompany) / (contacts.length * 2)) * 100 : 0;

 // Top companies
 const topCompanies = Object.entries(companyCounts)
   .sort(([,a], [,b]) => b - a)
   .slice(0, 5);

 // Charts data
 const companyBarData = {
   labels: Object.keys(companyCounts),
   datasets: [{
     label: 'Contacts per Company',
     data: Object.values(companyCounts),
     backgroundColor: [
       'rgba(25, 118, 210, 0.8)',
       'rgba(220, 0, 78, 0.8)', 
       'rgba(76, 175, 80, 0.8)',
       'rgba(255, 152, 0, 0.8)',
       'rgba(156, 39, 176, 0.8)',
       'rgba(96, 125, 139, 0.8)'
     ],
     borderColor: [
       '#1976d2', '#dc004e', '#4caf50', '#ff9800', '#9c27b0', '#607d8b'
     ],
     borderWidth: 2,
     borderRadius: 8,
   }]
 };

 const contactStatusData = {
   labels: ['Complete Profiles', 'Incomplete Profiles'],
   datasets: [{
     data: [
       contacts.filter(c => c.phone && c.company).length,
       contacts.filter(c => !c.phone || !c.company).length
     ],
     backgroundColor: ['#4caf50', '#ff9800'],
     borderWidth: 0,
     cutout: '60%',
   }]
 };

 const chartOptions = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
     legend: { 
       position: 'bottom' as const,
       labels: {
         padding: 20,
         usePointStyle: true,
         font: { size: 12 }
       }
     },
     tooltip: {
       backgroundColor: 'rgba(0,0,0,0.8)',
       titleColor: 'white',
       bodyColor: 'white',
       borderColor: 'rgba(255,255,255,0.1)',
       borderWidth: 1,
     }
   },
   scales: {
     y: {
       beginAtZero: true,
       grid: { color: 'rgba(0,0,0,0.1)' },
       ticks: { font: { size: 11 } }
     },
     x: {
       grid: { display: false },
       ticks: { 
         font: { size: 11 },
         maxRotation: 45
       }
     }
   }
 };

 return (
   <Box sx={{ p: 3 }}>
     {/* Header */}
     <Box sx={{ mb: 4 }}>
       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
         <Assessment sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
         <Typography variant="h3" sx={{ 
           fontWeight: 700, 
           background: 'linear-gradient(45deg, #1976d2, #dc004e)', 
           backgroundClip: 'text', 
           WebkitBackgroundClip: 'text', 
           color: 'transparent' 
         }}>
           CRM Analytics
         </Typography>
       </Box>
       <Typography variant="subtitle1" color="text.secondary">
         Comprehensive insights into your contact database
       </Typography>
     </Box>

     {/* Key Metrics Cards */}
     <Grid container spacing={3} sx={{ mb: 4 }}>
       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
         <Card sx={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           color: 'white',
           borderRadius: 3
         }}>
           <CardContent>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Box>
                 <Typography variant="h4" sx={{ fontWeight: 700 }}>
                   {contacts.length}
                 </Typography>
                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
                   Total Contacts
                 </Typography>
               </Box>
               <People sx={{ fontSize: 40, opacity: 0.8 }} />
             </Box>
           </CardContent>
         </Card>
       </Grid>

       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
         <Card sx={{ 
           background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
           color: 'white',
           borderRadius: 3
         }}>
           <CardContent>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Box>
                 <Typography variant="h4" sx={{ fontWeight: 700 }}>
                   {Object.keys(companyCounts).length}
                 </Typography>
                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
                   Companies
                 </Typography>
               </Box>
               <Business sx={{ fontSize: 40, opacity: 0.8 }} />
             </Box>
           </CardContent>
         </Card>
       </Grid>

       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
         <Card sx={{ 
           background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
           color: 'white',
           borderRadius: 3
         }}>
           <CardContent>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Box>
                 <Typography variant="h4" sx={{ fontWeight: 700 }}>
                   {contactsWithPhone}
                 </Typography>
                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
                   With Phone
                 </Typography>
               </Box>
               <PhoneOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
             </Box>
           </CardContent>
         </Card>
       </Grid>

       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
         <Card sx={{ 
           background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
           color: 'white',
           borderRadius: 3
         }}>
           <CardContent>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <Box>
                 <Typography variant="h4" sx={{ fontWeight: 700 }}>
                   {Math.round(completionRate)}%
                 </Typography>
                 <Typography variant="body2" sx={{ opacity: 0.9 }}>
                   Profile Complete
                 </Typography>
               </Box>
               <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
             </Box>
           </CardContent>
         </Card>
       </Grid>
     </Grid>

     {/* Charts Section */}
     <Grid container spacing={3} sx={{ mb: 4 }}>
       <Grid size={{ xs: 12, lg: 8 }}>
         <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
             <Business sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>
               Contacts Distribution by Company
             </Typography>
           </Box>
           <Box sx={{ height: 400 }}>
             <Bar data={companyBarData} options={chartOptions} />
           </Box>
         </Paper>
       </Grid>

       <Grid size={{ xs: 12, lg: 4 }}>
         <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
             <Timeline sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>
               Profile Completion
             </Typography>
           </Box>
           <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Doughnut data={contactStatusData} options={chartOptions} />
           </Box>
           <Box sx={{ textAlign: 'center', mt: 2 }}>
             <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
               {Math.round(completionRate)}%
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Average Completion Rate
             </Typography>
           </Box>
         </Paper>
       </Grid>
     </Grid>

     {/* Top Companies List */}
     <Grid container spacing={3}>
       <Grid size={{ xs: 12, md: 6 }}>
         <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
             <WorkOutline sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>
               Top Companies
             </Typography>
           </Box>
           {topCompanies.map(([company, count], index) => (
             <Box key={company} sx={{ mb: 2 }}>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                   <Avatar sx={{ 
                     mr: 2, 
                     bgcolor: `hsl(${index * 72}, 70%, 50%)`,
                     width: 32,
                     height: 32,
                     fontSize: '0.9rem'
                   }}>
                     {company.charAt(0).toUpperCase()}
                   </Avatar>
                   <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                     {company}
                   </Typography>
                 </Box>
                 <Chip 
                   label={`${count} contacts`}
                   size="small"
                   color="primary"
                   variant="outlined"
                 />
               </Box>
               <LinearProgress 
                 variant="determinate" 
                 value={(count / contacts.length) * 100}
                 sx={{ 
                   height: 6,
                   borderRadius: 3,
                   bgcolor: 'grey.200',
                   '& .MuiLinearProgress-bar': {
                     borderRadius: 3,
                     bgcolor: `hsl(${index * 72}, 70%, 50%)`
                   }
                 }}
               />
             </Box>
           ))}
         </Paper>
       </Grid>

       <Grid size={{ xs: 12, md: 6 }}>
         <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
             <EmailOutlined sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>
               Data Quality Insights
             </Typography>
           </Box>
           
           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
               <Typography variant="body2">Contacts with Phone Numbers</Typography>
               <Typography variant="body2" sx={{ fontWeight: 600 }}>
                 {contactsWithPhone}/{contacts.length}
               </Typography>
             </Box>
             <LinearProgress 
               variant="determinate" 
               value={contacts.length > 0 ? (contactsWithPhone / contacts.length) * 100 : 0}
               sx={{ height: 8, borderRadius: 4 }}
             />
           </Box>

           <Box sx={{ mb: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
               <Typography variant="body2">Contacts with Company Info</Typography>
               <Typography variant="body2" sx={{ fontWeight: 600 }}>
                 {contactsWithCompany}/{contacts.length}
               </Typography>
             </Box>
             <LinearProgress 
               variant="determinate" 
               value={contacts.length > 0 ? (contactsWithCompany / contacts.length) * 100 : 0}
               sx={{ height: 8, borderRadius: 4 }}
               color="secondary"
             />
           </Box>

           <Divider sx={{ my: 2 }} />
           
           <Box sx={{ textAlign: 'center' }}>
             <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
               {Math.round(completionRate)}%
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Overall Data Completeness Score
             </Typography>
           </Box>
         </Paper>
       </Grid>
     </Grid>
   </Box>
 );
};

export default Analytics;