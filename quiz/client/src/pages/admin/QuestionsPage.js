import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/QuestionsPage.css';

const API_BASE_URL = 'http://localhost:5000/api';

function QuestionsPage({ userRole, token, onBackToCategories }) {
  // Get both categoryId and subCategoryName from the URL
  const { categoryId, subCategoryName } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fields for new question
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  // Fetch questions for this category and subcategory
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/questions/${categoryId}/subcategories/${encodeURIComponent(subCategoryName)}/questions`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions || []);
      } else {
        setError(data.message || 'Failed to fetch questions.');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Network error or server is unreachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, [categoryId, subCategoryName]);

  const handleAddQuestion = async () => {
    setMessage('');
    if (!questionText.trim() || options.some(opt => !opt.trim())) {
      setMessage('Question text and all options are required.');
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/questions/${categoryId}/subcategories/${encodeURIComponent(subCategoryName)}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            questionText: questionText,
            options: options,
            correctAnswer: options[correctOptionIndex],
            category: categoryId,
            subcategory: subCategoryName
          })
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOptionIndex(0);
        fetchQuestions();
      } else {
        setMessage(`Error: ${data.message || 'Failed to add question.'}`);
      }
    } catch (err) {
      setMessage('Network error or server is unreachable.');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        fetchQuestions();
      } else {
        setMessage(`Error: ${data.message || 'Failed to delete question.'}`);
      }
    } catch (err) {
      console.error('Error deleting question:', err);
      setMessage('Network error or server is unreachable.');
    }
  };

  return (
    <div className="questions-container">
      <h1 className="questions-header">
        Questions for {subCategoryName ? `"${subCategoryName}"` : 'Subcategory'}
      </h1>

      {message && <p className="questions-message">{message}</p>}
      {loading && <p>Loading questions...</p>}
      {error && <p className="questions-error">Error: {error}</p>}

      {!loading && !error && (
        <div className="questions-list">
          {questions.length === 0 ? (
            <p>No questions available yet.</p>
          ) : (
            <ul>
              {questions.map((q) => (
                <li key={q._id} className="question-item">
                  <p><strong>Q:</strong> {q.questionText}</p>
                  <ol type="A">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ol>
                  <p><strong>Answer:</strong> {q.correctAnswer}</p>
                  {userRole === 'admin' && (
                    <button className="delete-button" onClick={() => handleDeleteQuestion(q._id)}>
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {userRole === 'admin' && (
        <div className="admin-section">
          <h2 className="questions-sub-header">Add New Question</h2>
          <input
            type="text"
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="input-field"
          />
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="input-field"
            />
          ))}
          <label className="label">Correct Option:</label>
          <select
            value={correctOptionIndex}
            onChange={(e) => setCorrectOptionIndex(Number(e.target.value))}
            className="select-field"
          >
            {options.map((_, idx) => (
              <option key={idx} value={idx}>{`Option ${idx + 1}`}</option>
            ))}
          </select>
          <button onClick={handleAddQuestion} className="add-button">
            Add Question
          </button>
        </div>
      )}

      <button onClick={() => navigate('/adminLayout/categories')} className="back-button">
        Back to Categories
      </button>
    </div>
  );
}

export default QuestionsPage;