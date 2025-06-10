import React, { useState, useEffect } from 'react';
import '../../css/CategoriesPage.css'; 


// Define your backend API base URL
const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your backend URL

function CategoriesPage({ userRole, token, onBackToHome }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages after actions

  // Function to fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCategories(data.categories || []);
      } else {
        setError(data.message || 'Failed to fetch categories.');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Network error or server is unreachable.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle adding a new category (Admin only)
  const handleAddCategory = async () => {
    setMessage('');
    if (!newCategoryName.trim()) {
      setMessage('Category name cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Admin token required
        },
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDescription,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setNewCategoryName('');
        setNewCategoryDescription('');
        fetchCategories(); // Refresh the list
      } else {
        setMessage(`Error: ${data.message || 'Failed to add category.'}`);
      }
    } catch (err) {
      console.error('Error adding category:', err);
      setMessage('Network error or server is unreachable.');
    }
  };

  // Function to handle deleting a category (Admin only)
  const handleDeleteCategory = async (categoryId) => {
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Admin token required
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        fetchCategories(); // Refresh the list
      } else {
        setMessage(`Error: ${data.message || 'Failed to delete category.'}`);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setMessage('Network error or server is unreachable.');
    }
  };

  return (
    <div className="categories-container">
      <h1 className="categories-header">Quiz Categories</h1>

      {message && <p className="categories-message">{message}</p>}

      {loading && <p>Loading categories...</p>}
      {error && <p className="categories-error">Error: {error}</p>}

      {!loading && !error && (
        <div className="categories-list">
          {categories.length === 0 ? (
            <p>No categories available yet.</p>
          ) : (
            <ul>
              {categories.map((category) => (
                <li key={category._id} className="category-item">
                  <span>{category.name}</span>
                  {userRole === 'admin' && ( // Admin specific delete button
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {userRole === 'admin' && ( // Admin specific category addition form
        <div className="admin-section">
          <h2 className="categories-sub-header">Add New Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Category Description (Optional)"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            className="input-field textarea-field"
          ></textarea>
          <button onClick={handleAddCategory} className="add-button">Add Category</button>
        </div>
      )}

      <button onClick={onBackToHome} className="back-button">Back to Home</button>
    </div>
  );
}

export default CategoriesPage;
