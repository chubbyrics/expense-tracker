import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import MonthlySummary from '../components/MonthlySummary';
import CategoryChart from '../components/CategoryChart';
import MonthlyComparisonChart from '../components/MonthlyComparisonChart';

const Dashboard = () => {
  const { expenses, loading, error, getExpensesByMonth, getCategoryTotals } = useExpenses();
  const { currentUser } = useAuth();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Memoized calculations
  const monthlyExpenses = React.useMemo(
    () => getExpensesByMonth(currentMonth, currentYear),
    [expenses, currentMonth, currentYear, getExpensesByMonth]
  );

  const categoryTotals = React.useMemo(
    () => getCategoryTotals(monthlyExpenses),
    [monthlyExpenses, getCategoryTotals]
  );

  if (!currentUser) {
    return (
      <Box sx={{ p: 3, marginTop: '120px', textAlign: 'center' }}>
        <Alert severity="warning">Please log in to view your dashboard</Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        marginTop: '-120px'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, marginTop: '120px' }}>
        <Alert severity="error">Error loading expenses: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      marginTop: '120px', 
      minHeight: 'calc(100vh - 120px)', 
      overflowY: 'auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Expense Dashboard
      </Typography>
      
      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <MonthlySummary 
              month={currentMonth} 
              year={currentYear} 
              expenses={monthlyExpenses}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Spending by Category ({new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })})
            </Typography>
            <CategoryChart 
              categoryTotals={categoryTotals} 
              month={currentMonth}
              year={currentYear}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Monthly Comparison Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Monthly Spending Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Daily spending patterns compared to previous month
        </Typography>
        <MonthlyComparisonChart 
          expenses={expenses} 
          currentYear={currentYear}
          isLoading={loading}
        />
      </Paper>

      {monthlyExpenses.length === 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No expenses recorded for this month yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;