import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { db } from "../FirebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom"; 
import { toast } from "react-toastify";
import "../styles/SignUp.css";
import NavBar from '../components/NavBar';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("Email already in use. Please use a different email.");
        setLoading(false);
        return;
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in database (no role is stored anymore)
      await set(ref(db, `users/${user.uid}`), {
        userID: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! Please log in.", {
        position: "top-center",
        autoClose: 2000,
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.code === "auth/email-already-in-use" 
          ? "Email already in use. Please use a different email."
          : error.code === "auth/invalid-email"
          ? "Invalid email format."
          : error.code === "auth/weak-password"
          ? "Password is too weak. Please use a stronger password."
          : "An error occurred during registration. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <NavBar /> {/* Add NavBar inside the return statement */}
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleRegister} className="register-form">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="register-input" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="register-input" 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="register-input" 
            />

            <button 
              type="submit" 
              className={`register-button ${loading ? 'loading' : ''}`} 
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            <p className="login-text">
              Already have an account? 
              <Link to="/login" className="login-link">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
