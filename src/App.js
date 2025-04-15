import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // New component


// Pages and components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddExpense from './pages/AddExpense';
import ViewExpenses from "./pages/ViewExpenses";
import NavBar from "./components/NavBar";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ExpenseProvider>
          <div className="app">
            <NavBar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/add" element={
                <ProtectedRoute>
                  <AddExpense />
                </ProtectedRoute>
              } />
              <Route path="/view" element={
                <ProtectedRoute>
                  <ViewExpenses />
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </ExpenseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;