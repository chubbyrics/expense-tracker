import React from 'react';
import { Box, Typography, Card, CardContent, Grid, useTheme } from '@mui/material';
import { useExpenses } from '../context/ExpenseContext';

const MonthlySummary = ({ month, year, expenses = [] }) => {
  const { getCategoryTotals } = useExpenses();
  const theme = useTheme();
  
  // Calculate totals
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const categoryTotals = getCategoryTotals(expenses);

  // Format month/year display
  const monthYear = new Date(year, month).toLocaleDateString('default', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Summary for {monthYear}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Expenses
              </Typography>
              <Typography variant="h4" color="primary">
                ${total.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {expenses.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Average per Transaction
              </Typography>
              <Typography variant="h4" color="primary">
                ${expenses.length > 0 ? (total / expenses.length).toFixed(2) : '0.00'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on {expenses.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {Object.keys(categoryTotals).length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Category Breakdown
          </Typography>
          {Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1]) // Sort by amount descending
            .map(([category, amount]) => (
              <Box 
                key={category} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 1,
                  p: 1,
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 1
                }}
              >
                <Typography>{category}</Typography>
                <Typography fontWeight="bold">
                  ${amount.toFixed(2)} ({((amount / total) * 100).toFixed(0)}%)
                </Typography>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default MonthlySummary;