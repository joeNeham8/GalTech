import React, { useEffect, useState } from 'react';
import '../../css/Quiz.css'; // Path for CSS, assuming Quiz.js is in src/pages/Quiz/
import QuizQuestions from './QuizQuestions'; // Path for QuizQuestions, assuming it's in the same directory

const API_BASE_URL = 'http://localhost:5000/api';

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State to manage quiz flow (e.g., 'category_selection', 'quiz_active', 'quiz_result')
  const [quizState, setQuizState] = useState('category_selection'); // New state

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

    if (!selectedCategory) return; // Don't fetch if no category is selected
    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        // Use 'categoryId' as the query parameter, as per your backend
        const response = await fetch(`${API_BASE_URL}/questions?category=${selectedCategory}`);
        const data = await response.json();
        if (response.ok) {
          // The backend returns an object with a 'questions' array inside
          setQuestions(data.questions || []);
          setQuizState('quiz_active'); // Move to quiz active state after fetching questions
        } else {
          setError(data.message || 'Failed to fetch questions.');
          setQuestions([]); // Clear questions on error
          setQuizState('category_selection'); // Go back to category selection
        }
      } catch (err) {
        setError('Network error or server is unreachable.');
        setQuestions([]); // Clear questions on network error
        setQuizState('category_selection'); // Go back to category selection
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedCategory]); // Re-run when selectedCategory changes

  // Function to handle moving back to category selection
  const handleBackToCategories = () => {
    setSelectedCategory('');
    setQuestions([]);
    setError('');
    setQuizState('category_selection');
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-main-header">Quiz</h1>
      {loading && <p className="quiz-loading">Loading...</p>}
      {error && <p className="quiz-error">{error}</p>}

      {/* Category Selection View */}
      {!loading && quizState === 'category_selection' && (
        <div className="quiz-category-selection">
          <h2 className="quiz-sub-header">Select a Category:</h2>
          {categories.length === 0 && !loading && !error && <p className="quiz-no-categories">No categories available.</p>}
          <div className="quiz-category-buttons">
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => {
                  console.log('Selected category:', cat._id); // <-- Add this line
                  setSelectedCategory(cat._id);
                }}
                className="quiz-category-button"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions Display View */}
      {!loading && quizState === 'quiz_active' && (
        <div className="quiz-questions-display">
          <h2 className="quiz-sub-header">Questions for {categories.find(cat => cat._id === selectedCategory)?.name}</h2>
          {questions.length === 0 && !loading && !error && <p className="quiz-no-questions">No questions available for this category.</p>}
          <QuizQuestions questions={questions} />
          <button onClick={handleBackToCategories} className="quiz-back-button">Back to Categories</button>
          {/* You'll add submit quiz button here later */}
        </div>
      )}
    </div>
  );
}

export default Quiz;










