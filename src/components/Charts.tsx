// src/components/Charts.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Charts: React.FC = () => {
  const data = {
    labels: ['Tech', 'Finance', 'Healthcare'],
    datasets: [{ label: 'Contacts', data: [12, 19, 8], backgroundColor: 'rgba(75,192,192,0.6)' }]
  };
  return <Bar data={data} />;
};
export default Charts;