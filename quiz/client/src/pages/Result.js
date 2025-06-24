import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Result.css'; 

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0, results = [] } = location.state || {};

  return (
    <div className="result-container">
      <h2 className="result-header">Quiz Results</h2>
      <p className="score-summary">Your Score: <strong>{score} / {total}</strong></p>
      <ul className="detailed-results-list">
        {results.map((res, idx) => (
          <li className="result-item" key={res.questionId}>
            <strong>Q{idx + 1}:</strong> {res.questionText}
            <p className="user-answer">Your Answer: {res.selected}</p>
            <p className="correct-answer">Correct Answer: {res.correct}</p>
            {res.isCorrect ? (
              <span className="status-indicator correct">Correct</span>
            ) : (
              <span className="status-indicator incorrect">Incorrect</span>
            )}
          </li>
        ))}
      </ul>
      <div className="result-navigation-buttons">
        <button className="result-button" onClick={() => navigate('/Quiz')}>categories</button>
      </div>
    </div>
  );
}

export default Result;