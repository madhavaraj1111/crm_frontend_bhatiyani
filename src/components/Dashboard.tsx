import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Card, CardContent, Avatar, Box, Chip } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import useContactStore from '../store/useContactStore';
import {
 Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement,
 Title, Tooltip, Legend
} from 'chart.js';
import { Person as PersonIcon, Business as BusinessIcon, Email as EmailIcon, Phone as PhoneIcon, TrendingUp, Groups, Schedule } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
 const { contacts, fetchContacts } = useContactStore();

 useEffect(() => {
   fetchContacts();
 }, []);

 const total = contacts.length;
 const companies = new Set(contacts.map(c => c.company)).size;
 const recent = contacts.filter(c =>
   new Date((c as any).created_at || '') > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
 ).length;

 const recentContacts = contacts.filter(c =>
   new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
 ).slice(0, 6);

 const barData = {
   labels: ['Total', 'Companies', 'Recent'],
   datasets: [{
     label: 'Contact Stats',
     data: [total, companies, recent],
     backgroundColor: ['rgba(25, 118, 210, 0.8)', 'rgba(220, 0, 78, 0.8)', 'rgba(76, 175, 80, 0.8)'],
     borderColor: ['#1976d2', '#dc004e', '#4caf50'],
     borderWidth: 2,
     borderRadius: 8,
   }],
 };

 const doughnutData = {
   labels: ['Active Contacts', 'Potential Leads'],
   datasets: [{
     data: [Math.round(total * 0.75), Math.round(total * 0.25)],
     backgroundColor: ['#4caf50', '#ff9800'],
     borderWidth: 0,
     cutout: '70%',
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
       }
     },
     title: { 
       display: false
     },
   },
   scales: {
     y: {
       beginAtZero: true,
       grid: {
         color: 'rgba(0,0,0,0.1)',
       }
     },
     x: {
       grid: {
         display: false,
       }
     }
   }
 };

 return (
   <Box sx={{ p: { xs: 2, md: 3 } }}>
     <Box sx={{ mb: 4 }}>
       <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, background: 'linear-gradient(45deg, #1976d2, #dc004e)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
         CRM Dashboard
       </Typography>
       <Typography variant="subtitle1" color="text.secondary">
         Manage your customer relationships effectively
       </Typography>
     </Box>

     {/* Enhanced Stats Cards */}
     <Grid container spacing={3} sx={{ mb: 4 }}>
       <StatCard 
         title="Total Contacts" 
         value={total} 
         icon={<Groups />}
         gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
         subtitle="Active customers"
       />
       <StatCard 
         title="Companies" 
         value={companies} 
         icon={<BusinessIcon />}
         gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
         subtitle="Business partners"
       />
       <StatCard 
         title="Recent Contacts" 
         value={recent} 
         icon={<Schedule />}
         gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
         subtitle="Last 7 days"
       />
     </Grid>

     {/* Enhanced Charts */}
     <Grid container spacing={3} sx={{ mb: 4 }}>
       <Grid size={{ xs: 12, lg: 8 }}>
         <Paper sx={{ p: 3, height: 450, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
             <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>Contact Analytics</Typography>
           </Box>
           <Box sx={{ height: 350 }}>
             <Bar data={barData} options={chartOptions} />
           </Box>
         </Paper>
       </Grid>
       <Grid size={{ xs: 12, lg: 4 }}>
         <Paper sx={{ p: 3, height: 450, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Contact Distribution</Typography>
           <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Doughnut data={doughnutData} options={chartOptions} />
           </Box>
           <Box sx={{ textAlign: 'center', mt: 2 }}>
             <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
               {Math.round((total * 0.75 / total) * 100)}%
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Active Engagement Rate
             </Typography>
           </Box>
         </Paper>
       </Grid>
     </Grid>

     {/* Enhanced Recent Contacts */}
     <Grid container spacing={3}>
       <Grid size={12}>
         <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
             <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6" sx={{ fontWeight: 600 }}>
               Recently Added Contacts
             </Typography>
           </Box>
           {recentContacts.length > 0 ? (
             <Grid container spacing={3}>
               {recentContacts.map((contact) => (
                 <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={contact.id}>
                   <Card 
                     sx={{ 
                       p: 3, 
                       height: '100%',
                       borderRadius: 2,
                       border: '1px solid',
                       borderColor: 'divider',
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                       '&:hover': {
                         borderColor: 'primary.main',
                         transform: 'translateY(-4px)',
                         boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                       }
                     }}
                   >
                     <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                       <Avatar 
                         sx={{ 
                           mr: 2, 
                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                           width: 56,
                           height: 56
                         }}
                       >
                         <PersonIcon sx={{ fontSize: 28 }} />
                       </Avatar>
                       <Box sx={{ flex: 1, minWidth: 0 }}>
                         <Typography 
                           variant="h6" 
                           sx={{ 
                             fontWeight: 600,
                             fontSize: '1.1rem',
                             overflow: 'hidden',
                             textOverflow: 'ellipsis',
                             whiteSpace: 'nowrap',
                             mb: 0.5
                           }}
                         >
                           {contact.name}
                         </Typography>
                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                           <Typography 
                             variant="body2" 
                             color="text.secondary"
                             sx={{ 
                               overflow: 'hidden',
                               textOverflow: 'ellipsis',
                               whiteSpace: 'nowrap'
                             }}
                           >
                             {contact.email}
                           </Typography>
                         </Box>
                       </Box>
                     </Box>
                     
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                       {contact.phone && (
                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'success.main' }} />
                           <Typography variant="body2" sx={{ fontWeight: 500 }}>
                             {contact.phone}
                           </Typography>
                         </Box>
                       )}
                       
                       {contact.company && (
                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <BusinessIcon sx={{ fontSize: 18, mr: 1, color: 'warning.main' }} />
                           <Chip 
                             label={contact.company} 
                             size="small" 
                             sx={{ 
                               background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                               color: 'text.primary',
                               fontWeight: 500,
                               maxWidth: '100%',
                               '& .MuiChip-label': {
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis'
                               }
                             }}
                           />
                         </Box>
                       )}
                     </Box>
                   </Card>
                 </Grid>
               ))}
             </Grid>
           ) : (
             <Box 
               sx={{ 
                 textAlign: 'center', 
                 py: 6,
                 background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                 borderRadius: 2,
               }}
             >
               <PersonIcon sx={{ fontSize: 64, mb: 2, color: 'primary.main', opacity: 0.7 }} />
               <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                 No recent contacts
               </Typography>
               <Typography variant="body1" color="text.secondary">
                 New contacts will appear here once added
               </Typography>
             </Box>
           )}
         </Paper>
       </Grid>
     </Grid>
   </Box>
 );
};

const StatCard = ({ title, value, icon, gradient, subtitle }: { 
 title: string; 
 value: number; 
 icon: React.ReactNode;
 gradient: string;
 subtitle: string;
}) => (
 <Grid size={{ xs: 12, sm: 6, md: 4 }}>
   <Card sx={{ 
     background: gradient,
     color: 'white',
     borderRadius: 3,
     boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
     transition: 'transform 0.3s ease',
     '&:hover': {
       transform: 'translateY(-8px)',
     }
   }}>
     <CardContent sx={{ p: 3 }}>
       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
         <Box>
           <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
             {title}
           </Typography>
           <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
             {value}
           </Typography>
         </Box>
         <Box sx={{ opacity: 0.8 ,fontSize: 40}}>
           {React.cloneElement(icon as React.ReactElement)}
         </Box>
       </Box>
       <Typography variant="caption" sx={{ opacity: 0.8 }}>
         {subtitle}
       </Typography>
     </CardContent>
   </Card>
 </Grid>
);

export default Dashboard;