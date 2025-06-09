import React from 'react';
import '../css/Navbar.css'; 
import logo from '../assets/logo.png'; 

function Navbar({ userName, onLogout }) {
  return (
    <nav className="navbar">
    <div  className="navbar-brand">
        <img
          src={logo} 
          alt="Portal Logo"
          className="navbar-logo"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=Logo+Err" }}
        />
        </div>
      <div className="navbar-links">
        <a  href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/Quiz">Quiz</a>
        <a href="/Result">Result</a>
        <a href='/Dashboard'>Dashboard</a>
        <a href='/Admin'>Admin</a>
        <a href='/Register'>Register</a>
        </div>
    </nav>
  );
}

export default Navbar;