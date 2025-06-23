import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Result.css'; 

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0, results = [] } = location.state || {};

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <p>Your Score: <strong>{score} / {total}</strong></p>
      <ul>
        {results.map((res, idx) => (
          <li key={res.questionId}>
            <strong>Q{idx + 1}:</strong> {res.questionText}<br />
            Your Answer: {res.selected} <br />
            Correct Answer: {res.correct} <br />
            {res.isCorrect ? <span style={{color: 'green'}}>Correct</span> : <span style={{color: 'red'}}>Incorrect</span>}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/Quiz')}>categories</button>
    </div>
  );
}

export default Result;