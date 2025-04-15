import React from 'react';
import { TextField, Button } from '@mui/material';

const ExpenseForm = () => {
  return (
    <form>
      <TextField label="Description" fullWidth margin="normal" />
      <TextField label="Amount" type="number" fullWidth margin="normal" />
      <Button type="submit" variant="contained">
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;