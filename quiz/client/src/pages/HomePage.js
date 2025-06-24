import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css';

const API_BASE_URL = 'http://localhost:5000/api';

// New component for the button
function ViewAllCategoriesButton({ disabled }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/quiz')}
      className="view-categories-button"
      disabled={disabled}
    >
      View All Categories
    </button>
  );
}

function HomePage({ userName }) {
  let name = userName;
  if (!name) {
    const user = JSON.parse(localStorage.getItem('user'));
    name = user?.name || '';
  }

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories || []);
        } else {
          setError(data.message || 'Failed to fetch categories.');
        }
      } catch (err) {
        setError('Network error or server is unreachable.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, <span className="user-name">{name}</span></h1>
      </header>
      {/* Intro Section */}
      <div className="home-intro">
        <h2>Test Your Knowledge with Our Interactive Quiz!</h2>
        <p>
          Welcome to the quiz portal where learning meets fun. Choose from a wide range of categories including Programming, Aptitude, Logical Reasoning, and more. Whether you're preparing for interviews, improving your skills, or just having fun, our quizzes are designed to challenge and engage you.
        </p>
        <ul>
          <li>✅ Practice real-world questions</li>
          <li>✅ Instant feedback and results</li>
          <li>✅ Supports coding-based and objective questions</li>
          <li>✅ Track your progress and improve over time</li>
        </ul>
        <p>
          <strong>Ready to challenge yourself?</strong><br />
        
        </p>
      </div>
      <div className="aptitude-buttons">
        {loading && <p>Loading categories...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && categories.length === 0 && (
          <p>No categories available yet.</p>
        )}
        {/* Removed category buttons */}
        {!loading && !error && categories.length > 0 && (
          <ViewAllCategoriesButton />
        )}
      </div>
    </div>
  );
}

export default HomePage;