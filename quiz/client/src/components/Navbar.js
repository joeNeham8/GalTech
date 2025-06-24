import React, { useState,useRef } from 'react';
import '../css/Navbar.css'; 
import logo from '../assets/logo.png'; 

function Navbar({ userName, onLogout }) {
 const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeout = useRef();

  const handleDropdownEnter = () => {
    clearTimeout(closeTimeout.current);
    setMenuOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => setMenuOpen(false), 2000); // 600ms delay
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={logo} 
          alt="Portal Logo"
          className="navbar-logo"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=Logo+Err" }}
        />
      </div>
      <div className={`navbar-links`}>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/Quiz">Quiz</a>
        <a href="/Result">Result</a>
        <a href="/Dashboard">Dashboard</a>
        <a href="/Register">Register</a>
        <div
          className={`navbar-dropdown${menuOpen ? ' open' : ''}`}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          
        >
          <button
            className="navbar-link-button"
            onClick={() => setMenuOpen((open) => !open)}
            tabIndex={0}
          >
            More
          </button>
          <div className="navbar-dropdown-content">
            <a href="/AdminLayout">Admin</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;