import React, { useEffect, useState } from 'react';
import '../../css/Quiz.css';
import QuizQuestions from './QuizQuestions';

const API_BASE_URL = 'http://localhost:5000/api';

function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizState, setQuizState] = useState('category_selection');

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

  // Fetch questions when a subcategory is selected
  useEffect(() => {
    if (!selectedCategory || !selectedSubCategory) return;
    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `${API_BASE_URL}/questions/${selectedCategory}/subcategories/${encodeURIComponent(selectedSubCategory)}/questions`
        );
        const data = await response.json();
        if (response.ok) {
          setQuestions(data.questions || []);
          setQuizState('quiz_active');
        } else {
          setError(data.message || 'Failed to fetch questions.');
          setQuestions([]);
          setQuizState('category_selection');
        }
      } catch (err) {
        setError('Network error or server is unreachable.');
        setQuestions([]);
        setQuizState('category_selection');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedCategory, selectedSubCategory]);

  // Back to category selection
  const handleBackToCategories = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setQuestions([]);
    setError('');
    setQuizState('category_selection');
  };

  // Back to subcategory selection
  const handleBackToSubCategories = () => {
    setSelectedSubCategory('');
    setQuestions([]);
    setError('');
    setQuizState('subcategory_selection');
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
          {categories.length === 0 && !loading && !error && (
            <p className="quiz-no-categories">No categories available.</p>
          )}
          <div className="quiz-category-list">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="quiz-category-card"
                onClick={() => {
                  setSelectedCategory(cat._id);
                  setQuizState('subcategory_selection');
                }}
              >
                <div className="quiz-category-title">{cat.name}</div>
                <div className="quiz-category-desc">{cat.description}</div>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="quiz-subcategory-links">
                    {cat.subcategories.map((subcat, idx) => (
                      <button
                        key={idx}
                        className="quiz-subcategory-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(cat._id);
                          setSelectedSubCategory(subcat);
                        }}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subcategory Selection View */}
      {!loading && quizState === 'subcategory_selection' && selectedCategory && (
        <div className="quiz-subcategory-selection">
          <button className="quiz-back-button" onClick={handleBackToCategories}>
            Back to Categories
          </button>
          <h2 className="quiz-sub-header">
            Select a Subcategory:
          </h2>
          <div className="quiz-subcategory-list">
            {categories
              .find((cat) => cat._id === selectedCategory)
              ?.subcategories?.map((subcat, idx) => (
                <button
                  key={idx}
                  className="quiz-subcategory-link"
                  onClick={() => setSelectedSubCategory(subcat)}
                >
                  {subcat}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Questions Display View */}
      {!loading && quizState === 'quiz_active' && (
        <div className="quiz-questions-display">
          <button className="quiz-back-button" onClick={handleBackToSubCategories}>
            Back to Subcategories
          </button>
          <h2 className="quiz-sub-header">
            Questions for{' '}
            {categories.find((cat) => cat._id === selectedCategory)?.name} &gt;{' '}
            {selectedSubCategory}
          </h2>
          {questions.length === 0 && !loading && !error && (
            <p className="quiz-no-questions">
              No questions available for this subcategory.
            </p>
          )}
          <QuizQuestions questions={questions} />
        </div>
      )}
    </div>
  );
}

export default Quiz;