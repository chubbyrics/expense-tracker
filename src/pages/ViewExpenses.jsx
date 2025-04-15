import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, TextField, MenuItem, Grid, Box,
  useMediaQuery, useTheme
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { format } from 'date-fns';
import '../styles/ViewExpenses.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = [2025, 2026, 2027, 2028, 2029, 2030];

const ViewExpenses = () => {
  const { expenses, deleteExpense, getExpensesByMonth } = useExpenses();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const filteredExpenses = getExpensesByMonth(selectedMonth, selectedYear);

  return (
    <Box sx={{
      pt: '80px',
      minHeight: 'calc(100vh - 80px)',
      overflow: 'auto',
      bgcolor: '#f9f9f9',
      px: { xs: 1, sm: 3 },
    }}>
      <Box sx={{ 
        p: { xs: 1, sm: 3 }, 
        bgcolor: '#fff', 
        borderRadius: 2, 
        boxShadow: 3,
        overflowX: 'auto'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          View Expenses
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              fullWidth
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              size={isSmallScreen ? 'small' : 'medium'}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              fullWidth
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              size={isSmallScreen ? 'small' : 'medium'}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box className="table-container">
          <TableContainer component={Paper}>
            <Table sx={{ 
              minWidth: isSmallScreen ? 'auto' : 650,
              tableLayout: isSmallScreen ? 'auto' : 'fixed'
            }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: isSmallScreen ? 'auto' : '20%' }}>Date</TableCell>
                  <TableCell sx={{ width: isSmallScreen ? 'auto' : '30%' }}>Description</TableCell>
                  <TableCell sx={{ width: isSmallScreen ? 'auto' : '20%' }}>Category</TableCell>
                  <TableCell align="right" sx={{ width: isSmallScreen ? 'auto' : '15%' }}>Amount</TableCell>
                  <TableCell sx={{ width: isSmallScreen ? 'auto' : '15%' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1">No expenses found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell sx={{ 
                        fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                        whiteSpace: 'nowrap'
                      }}>
                        {format(new Date(expense.date), isSmallScreen ? 'MM/dd' : 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                        maxWidth: 150,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {expense.description}
                      </TableCell>
                      <TableCell sx={{ fontSize: isSmallScreen ? '0.75rem' : '0.875rem' }}>
                        {expense.category}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: isSmallScreen ? '0.75rem' : '0.875rem' }}>
                        ${parseFloat(expense.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => deleteExpense(expense.id)} 
                          size={isSmallScreen ? 'small' : 'medium'}
                          sx={{ p: isSmallScreen ? 0.5 : 1 }}
                        >
                          <Delete color="error" fontSize={isSmallScreen ? 'small' : 'medium'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewExpenses;