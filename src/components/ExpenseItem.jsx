import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Healthcare',
  'Insurance',
  'Personal',
  'Entertainment',
  'Education',
  'Savings',
  'Other'
];

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date()
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill all fields');
      return;
    }
    addExpense(formData);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date()
    });
    alert('Expense added successfully!');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Expense
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={formData.date}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" required />
          )}
        />
      </LocalizationProvider>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Expense
      </Button>
    </Box>
  );
};

export default ExpenseForm;