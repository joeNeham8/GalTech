import React from 'react';
import '../css/HomePage.css';  

function HomePage({ userName, onNavigateToCategories }) { // Added onNavigateToCategories prop
  return (
    <div className="home-container">     
 <header className="home-header">
        <h1>Welcome, {userName}!</h1>
      </header>
      <div className="aptitude-buttons">
        <button>General Aptitude</button>
        <button>Programming Aptitude</button>
        <button>Program-Based Questions</button>
        {/* New button to navigate to categories */}
        <button onClick={onNavigateToCategories} style={{ backgroundColor: '#007bff', marginTop: '20px' }}>
          Manage Quiz Categories
        </button>
      </div>
    </div>
  );
}

export default HomePage;





