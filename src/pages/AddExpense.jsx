import { useState, useContext } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import '../styles/AddExpense.css';

const AddExpense = () => {
  const { addExpense, categories, loading } = useExpenses();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: categories[0] || '',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!currentUser) {
      setError('You must be logged in to add expenses');
      return;
    }

    if (!formData.description || !formData.amount || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const expense = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      await addExpense(expense);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        description: '',
        amount: '',
        category: categories[0] || '',
        date: new Date().toISOString().split('T')[0]
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding expense:', err);
      setError(err.message || 'Failed to add expense. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="form-container" sx={{ p: 3, maxWidth: 600, mx: 'auto', height: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Expense
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Expense added successfully!
        </Alert>
      )}

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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting || loading}
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
            disabled={submitting}
          />
        </Box>

        <button 
  type="submit" 
  className="submit-btn"
  disabled={submitting || loading}
>
  {submitting ? (
    <>
      <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
      Adding...
    </>
  ) : (
    'Add Expense'
  )}
</button>
      </form>
    </Box>
  );
};

export default AddExpense;