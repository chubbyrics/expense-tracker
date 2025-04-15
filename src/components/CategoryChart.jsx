import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Typography, useTheme } from '@mui/material';
import { useExpenses } from '../context/ExpenseContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ month, year, categoryTotals = {} }) => {
  const theme = useTheme();
  
  // Generate colors from theme
  const backgroundColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.text.primary,
    theme.palette.grey[500],
  ];

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: backgroundColors,
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <Box sx={{ 
      maxWidth: '100%', 
      height: '400px',
      p: 2,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 2,
      boxShadow: theme.shadows[1]
    }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        Spending by Category ({new Date(year, month).toLocaleString('default', { month: 'long' })})
      </Typography>
      <Box sx={{ height: 'calc(100% - 40px)' }}>
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default CategoryChart;