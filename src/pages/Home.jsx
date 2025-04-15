import React, { useRef } from 'react';
import { FaPlusCircle, FaTrashAlt, FaTags, FaCalendarAlt, FaChartPie, FaFileExport, FaEdit, FaExchangeAlt, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../styles/home.css';
import heroImage from '../assets/hero-image.png';
import NavBar from '../components/NavBar';

const Home = () => {
  const footerRef = useRef(null); // Create a reference for the footer

  // Function to scroll to footer
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <NavBar onContactClick={scrollToFooter} /> {/* Pass the scroll function to NavBar */}

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Take Control of Your <span>Spending</span>
            </h1>
            <p>Manage your money smarter with our simple, powerful expense tracker. No stress, just clarity.</p>
            <div className="hero-buttons">
              {/* Use Link component for navigation */}
              <Link to="/signup">
                <button className="btn btn-primary">
                  Start Tracking
                </button>
              </Link>
              <button className="btn btn-outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}>
                How It Works
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Expense tracking dashboard" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Powerful <span>Features</span></h2>
          <p className="section-subtitle">Everything you need to manage your expenses effectively</p>
          <div className="features-grid">
            {[ 
              { icon: <FaPlusCircle />, title: "Add Expenses", desc: "Quickly record daily expenses with amount, category, and notes." },
              { icon: <FaTrashAlt />, title: "Delete Entries", desc: "Remove incorrect or unnecessary expenses with one click." },
              { icon: <FaTags />, title: "Categories", desc: "Organize by Food, Bills, Shopping, Transport, and more." },
              { icon: <FaCalendarAlt />, title: "Monthly View", desc: "Isolate and compare expenses by month with our time filters." },
              { icon: <FaChartPie />, title: "Spending Breakdown", desc: "Visual charts show your category distribution and trends." },
              { icon: <FaFileExport />, title: "Export Data", desc: "Download monthly reports for offline analysis." }
            ].map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>Track Expenses <span>By Month</span></h2>
          <p className="section-subtitle">See exactly where your money goes each month</p>
          <div className="steps">
            {[ 
              { icon: <FaEdit />, title: "1. Record Expenses", desc: "Add expenses as they occur with category tags." },
              { icon: <FaCalendarAlt />, title: "2. Select Month", desc: "Use our calendar picker to view specific months." },
              { icon: <FaChartPie />, title: "3. View Breakdown", desc: "See pie charts and totals for your selected period." },
              { icon: <FaExchangeAlt />, title: "4. Compare Months", desc: "Track spending changes between months." }
            ].map((step, index) => (
              <div className="step" key={index}>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" className="cta">
        <div className="container">
          <h2>Ready to take control of your finances?</h2>
          <p>Get started today and see how our expense tracker can make managing your money easier and more effective. It's time to make smarter choices with your spending.</p>
          {/* Use Link component for navigation */}
          <Link to="/signup">
            <button className="btn btn-primary">
              Start Tracking Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef}> {/* Assign footerRef to footer */}
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <span className="logo">Expense<span>Tracker</span></span>
              <p>Helping you manage your money better since 2023.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => window.scrollTo(0, 0)}>Home</button></li>
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView()}>Features</button></li>
                <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}>How It Works</button></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <ul>
                <li><FaEnvelope /> support@expensetracker.com</li>
                <li><FaPhone /> +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
