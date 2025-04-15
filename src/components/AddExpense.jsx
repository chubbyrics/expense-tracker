import { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Box, Typography } from '@mui/material';
import '../styles/AddExpense.css'; // Import the external CSS file

const AddExpense = () => {
  const { addExpense, categories } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: categories[0] || '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now()
    };

    addExpense(expense);

    setFormData({
      description: '',
      amount: '',
      category: categories[0] || '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Box className="form-container" sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Expense
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box className="form-group">
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="form-input"
          />
        </Box>

        <Box className="form-group">
          <Typography variant="subtitle1" gutterBottom>
            Amount ($)
          </Typography>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="form-input"
          />
        </Box>

        <Box className="form-group">
          <Typography variant="subtitle1" gutterBottom>
            Category
          </Typography>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="form-input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Box>

        <Box className="form-group">
          <Typography variant="subtitle1" gutterBottom>
            Date
          </Typography>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="form-input"
          />
        </Box>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </Box>
  );
};

export default AddExpense;
