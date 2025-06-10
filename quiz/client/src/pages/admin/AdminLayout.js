import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import '../../css/AdminLayout.css';
//import ''; // Import the dedicated CSS file

function AdminLayout({ userName, userRole }) {
  // We're assuming userRole is 'admin' to reach this page,
  // but it's good practice to pass it down.

  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Panel</h1>
      <p className="admin-welcome">Welcome, {userName} ({userRole})</p>

      <div className="admin-navigation-buttons">
        {/* Link to Categories Management (already exists and is admin-only) */}
        <Link to="/CategoriesPage" className="admin-nav-button">Manage Quiz Categories</Link>

        {/* Placeholder for future admin sections */}
        <button className="admin-nav-button" onClick={() => alert('Manage Questions - Coming Soon!')}>
          Manage Questions
        </button>
        <button className="admin-nav-button" onClick={() => alert('View Student Attempts - Coming Soon!')}>
          View Student Attempts
        </button>
        <button className="admin-nav-button" onClick={() => alert('View Scores & Leaderboard - Coming Soon!')}>
          View Scores & Leaderboard
        </button>
      </div>

      <Link to="/" className="admin-back-button">Back to Home</Link>
    </div>
  );
}

export default AdminLayout;
