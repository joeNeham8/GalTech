import React, { useEffect, useState } from 'react';
import '../css/Quiz.css';

const API_BASE_URL = 'http://localhost:5000/api';

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories on mount
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

  // Fetch questions when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/questions?category=${selectedCategory}`);
        const data = await response.json();
        if (response.ok) {
          setQuestions(Array.isArray(data) ? data : data.questions || []);
        } else {
          setError(data.message || 'Failed to fetch questions.');
        }
      } catch (err) {
        setError('Network error or server is unreachable.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedCategory]);

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Category Selection */}
      {!selectedCategory && !loading && (
        <div>
          <h2>Select a Category:</h2>
          {categories.length === 0 && <p>No categories available.</p>}
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{ margin: '10px' }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Questions Display */}
      {selectedCategory && !loading && (
        <div>
          <h2>Questions for {categories.find(cat => cat._id === selectedCategory)?.name}</h2>
          {questions.length === 0 ? (
            <p>No questions available for this category.</p>
          ) : (
            <ul>
              {questions.map(q => (
                <li key={q._id}>{q.questions}</li>
              ))}
            </ul>
          )}
          <button onClick={() => setSelectedCategory('')}>Back to Categories</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;