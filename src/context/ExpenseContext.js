import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../FirebaseConfig';
import { ref, push, onValue, off, set, remove } from 'firebase/database';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState([
    'Food', 
    'Transport', 
    'Utilities', 
    'Entertainment', 
    'Bills', 
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load expenses from Firebase
  useEffect(() => {
    if (!currentUser) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const expensesRef = ref(db, `users/${currentUser.uid}/expenses`);
    
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const loadedExpenses = [];
        
        if (data) {
          Object.keys(data).forEach(key => {
            if (data[key] && data[key].date && data[key].amount) {
              loadedExpenses.push({
                id: key,
                description: data[key].description || '',
                amount: parseFloat(data[key].amount) || 0,
                category: data[key].category || 'Other',
                date: data[key].date,
                createdAt: data[key].createdAt || Date.now()
              });
            }
          });
        }
        
        setExpenses(loadedExpenses);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error processing expenses:', err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => off(expensesRef, 'value', unsubscribe);
  }, [currentUser]);

  // Add expense to Firebase
  const addExpense = useCallback(async (expense) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      const expenseData = {
        description: expense.description || '',
        amount: parseFloat(expense.amount) || 0,
        category: expense.category || 'Other',
        date: expense.date || new Date().toISOString().split('T')[0],
        createdAt: { '.sv': 'timestamp' }
      };

      const newExpenseRef = push(ref(db, `users/${currentUser.uid}/expenses`));
      await set(newExpenseRef, expenseData);
      
      return {
        id: newExpenseRef.key,
        ...expenseData
      };
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  }, [currentUser]);

  // Delete expense from Firebase
  const deleteExpense = useCallback(async (id) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      await remove(ref(db, `users/${currentUser.uid}/expenses/${id}`));
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  }, [currentUser]);

  // Get expenses by month and year
  const getExpensesByMonth = useCallback((month, year) => {
    if (!Array.isArray(expenses)) return [];
    
    return expenses.filter((expense) => {
      try {
        const date = new Date(expense.date);
        return date.getMonth() === month && date.getFullYear() === year;
      } catch {
        return false;
      }
    });
  }, [expenses]);

  // Get category totals
  const getCategoryTotals = useCallback((expensesList = expenses) => {
    const totals = {};
    
    if (!Array.isArray(expensesList)) return totals;
    
    expensesList.forEach(({ category, amount }) => {
      const cat = category || 'Other';
      totals[cat] = (totals[cat] || 0) + (parseFloat(amount) || 0);
    });
    
    return totals;
  }, [expenses]);

  // Get daily expenses for a month
  const getDailyExpenses = useCallback((month, year) => {
    if (!Array.isArray(expenses)) return [];
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyTotals = Array(daysInMonth).fill(0);
    
    expenses.forEach((expense) => {
      try {
        const date = new Date(expense.date);
        if (date.getMonth() === month && date.getFullYear() === year) {
          const day = date.getDate() - 1;
          if (day >= 0 && day < daysInMonth) {
            dailyTotals[day] += parseFloat(expense.amount) || 0;
          }
        }
      } catch {
        // Skip invalid dates
      }
    });
    
    return dailyTotals;
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        loading,
        error,
        addExpense,
        deleteExpense,
        getExpensesByMonth,
        getCategoryTotals,
        getDailyExpenses
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};