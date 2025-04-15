import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';

const MonthlyComparisonChart = ({ expenses = [], currentYear, isLoading }) => {
  // Data validation and loading state
  if (isLoading) {
    return (
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No expense data available for comparison
        </Typography>
      </Box>
    );
  }

  // Get current date info
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Process current month data
  const currentMonthData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return expenses
      .filter(exp => {
        try {
          const expDate = new Date(exp.date);
          return (
            expDate.getDate() === day &&
            expDate.getMonth() === currentMonth &&
            expDate.getFullYear() === currentYear
          );
        } catch {
          return false;
        }
      })
      .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
  });

  // Process previous month data (handles year transition)
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const previousMonthData = Array.from({ length: daysInPrevMonth }, (_, i) => {
    const day = i + 1;
    return expenses
      .filter(exp => {
        try {
          const expDate = new Date(exp.date);
          return (
            expDate.getDate() === day &&
            expDate.getMonth() === prevMonth &&
            expDate.getFullYear() === prevYear
          );
        } catch {
          return false;
        }
      })
      .reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
  });

  // Create chart data (align by day number)
  const maxDays = Math.max(daysInMonth, daysInPrevMonth);
  const chartData = Array.from({ length: maxDays }, (_, i) => {
    const day = i + 1;
    return {
      day: `Day ${day}`,
      Current: day <= daysInMonth ? currentMonthData[i] : null,
      Previous: day <= daysInPrevMonth ? previousMonthData[i] : null
    };
  });

  // Format month names for legend
  const monthNames = {
    current: new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }),
    previous: new Date(prevYear, prevMonth).toLocaleString('default', { month: 'long' })
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 12 }}
          interval={Math.floor(maxDays / 7)} // Show ~7 labels
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          width={80}
        />
        <Tooltip 
          formatter={(value, name) => [
            value === null ? 'No data' : `$${value.toFixed(2)}`,
            name === 'Current' ? monthNames.current : monthNames.previous
          ]}
        />
        <Legend 
          formatter={(value) => value === 'Current' ? monthNames.current : monthNames.previous}
        />
        <Line 
          type="monotone"
          dataKey="Current"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          name="Current"
        />
        <Line 
          type="monotone"
          dataKey="Previous"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          name="Previous"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyComparisonChart;