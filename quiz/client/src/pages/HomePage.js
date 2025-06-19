import React, { useEffect, useState } from 'react';
import '../css/HomePage.css';

const API_BASE_URL = 'http://localhost:5000/api';

function HomePage({ userName, onNavigateToCategories }) {
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
        <h1>Welcome, {userName}!</h1>
      </header>
      <div className="aptitude-buttons">
        {loading && <p>Loading categories...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && categories.length === 0 && (
          <p>No categories available yet.</p>
        )}
        {!loading && !error && categories.map((cat) => (
          <button key={cat._id} style={{ margin: '10px' }}>
            {cat.name}
          </button>
        ))}
        {/* Optional: Button for admin to manage categories */}
        {/* {onNavigateToCategories && (
          <button onClick={onNavigateToCategories} style={{ backgroundColor: '#007bff', marginTop: '20px' }}>
            Manage Quiz Categories
          </button>
        )} */}
      </div>
    </div>
  );
}

export default HomePage;