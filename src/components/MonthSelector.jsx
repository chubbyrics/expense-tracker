import { useContext } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import { ExpenseContext } from '../context/ExpenseContext';

export default function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useContext(ExpenseContext);
  
  const handlePrevMonth = () => {
    const prevMonth = subMonths(new Date(selectedMonth), 1);
    setSelectedMonth(format(prevMonth, 'yyyy-MM'));
  };
  
  const handleNextMonth = () => {
    const nextMonth = addMonths(new Date(selectedMonth), 1);
    setSelectedMonth(format(nextMonth, 'yyyy-MM'));
  };

  return (
    <div className="month-selector">
      <button onClick={handlePrevMonth}>&lt; Prev</button>
      <h3>{format(new Date(selectedMonth), 'MMMM yyyy')}</h3>
      <button onClick={handleNextMonth}>Next &gt;</button>
    </div>
  );
}