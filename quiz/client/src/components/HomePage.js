import React from 'react';
import '../css/HomePage.css';  

function HomePage({ userName }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, {userName}!</h1>
      </header>
      <div className="aptitude-buttons">
        <button>General Aptitude</button>
        <button>Programming Aptitude</button>
        <button>Program-Based Questions</button>
      </div>
    </div>
  );
}

export default HomePage;