import React, { useState, useEffect } from 'react';
import '../../css/CategoriesPage.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api';

function CategoriesPage({ userRole, token, onBackToHome }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // --- Subcategory state ---
  const [showSubCategoryForm, setShowSubCategoryForm] = useState({});
  const [subCategoryName, setSubCategoryName] = useState({});
  const [subCategories, setSubCategories] = useState({}); // {categoryId: [subcat, ...]}

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
  }, []);

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
          'Authorization': `Bearer ${token}`,
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
        fetchCategories();
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
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        fetchCategories();
      } else {
        setMessage(`Error: ${data.message || 'Failed to delete category.'}`);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setMessage('Network error or server is unreachable.');
    }
  };

  // --- Subcategory handlers (local state only, replace with API for production) ---
  const handleAddSubCategory = async (categoryId) => {
    if (!subCategoryName[categoryId]?.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subcategory: subCategoryName[categoryId] })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Subcategory added!');
        fetchCategories(); // refresh categories to get new subcategories
      } else {
        setMessage(data.message || 'Failed to add subcategory.');
      }
    } catch (err) {
      setMessage('Network error or server is unreachable.');
    }
    setSubCategoryName((prev) => ({ ...prev, [categoryId]: '' }));
    setShowSubCategoryForm((prev) => ({ ...prev, [categoryId]: false }));
  };
  // ...existing imports and code...

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
                  {userRole === 'admin' && (
                    <div>
                      <button onClick={() => handleDeleteCategory(category._id)}>
                        Delete
                      </button>
                      {/* Removed Manage Questions from category */}
                      {/* Sub Category Button */}
                      <button
                        onClick={() =>
                          setShowSubCategoryForm((prev) => ({
                            ...prev,
                            [category._id]: !prev[category._id],
                          }))
                        }
                      >
                        {showSubCategoryForm[category._id] ? 'Cancel' : 'Add Sub Category'}
                      </button>
                      {/* Sub Category Form */}
                      {showSubCategoryForm[category._id] && (
                        <div style={{ marginTop: '0.5em' }}>
                          <input
                            type="text"
                            placeholder="Sub Category Name"
                            value={subCategoryName[category._id] || ''}
                            onChange={(e) =>
                              setSubCategoryName((prev) => ({
                                ...prev,
                                [category._id]: e.target.value,
                              }))
                            }
                          />
                          <button onClick={() => handleAddSubCategory(category._id)}>
                            Save Sub Category
                          </button>
                        </div>
                      )}

                      {category.subcategories && category.subcategories.length > 0 && (
                        <ul style={{ marginTop: '0.5em', marginLeft: '1em' }}>
                          {category.subcategories.map((subcat, idx) => (
                            <li key={idx}>
                              {subcat}
                              <button
                                style={{ marginLeft: '1em' }}
                                onClick={() =>
                                  navigate(
                                    `/adminLayout/categories/${category._id}/subcategories/${encodeURIComponent(
                                      subcat
                                    )}/questions`
                                  )
                                }
                              >
                                Manage Questions
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {userRole === 'admin' && (
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
          <button onClick={handleAddCategory} className="add-button">
            Add Category
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;