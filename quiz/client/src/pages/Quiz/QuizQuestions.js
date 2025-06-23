import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizQuestions({ questions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!questions.length) {
    return <p>No questions added in this category.</p>;
  }

  const handleOptionChange = (questionId, optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optIdx
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions are answered
    if (questions.some(q => selectedAnswers[q._id] === undefined)) {
      setError('Please answer all questions before submitting.');
      return;
    }

    // Calculate score
    let score = 0;
    const results = questions.map(q => {
      const selectedIdx = selectedAnswers[q._id];
      const isCorrect = q.options[selectedIdx] === q.correctAnswer;
      if (isCorrect) score += (q.marks || 1);
      return {
        questionId: q._id,
        questionText: q.questionText,
        selected: q.options[selectedIdx],
        correct: q.correctAnswer,
        isCorrect
      };
    });

    // Navigate to Result page with results and score
    navigate('/result', { state: { score, total: questions.reduce((sum, q) => sum + (q.marks || 1), 0), results } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="quiz-questions-list">
        {questions.map((q, idx) => (
          <li key={q._id} className="quiz-question-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <strong>Q{idx + 1}:</strong> <span className="question-text-content">{q.questionText}</span>
              </span>
              <span className="question-marks" style={{ fontWeight: 'bold', color: '#2b7a2b' }}>
                {q.marks ? `${q.marks} marks` : '1 mark'}
              </span>
            </div>
            {q.options && q.options.length > 0 && (
              <ol type="A" className="question-options-list">
                {q.options.map((opt, optIdx) => (
                  <li key={optIdx} className="question-option-item">
                    <label>
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        value={optIdx}
                        checked={selectedAnswers[q._id] === optIdx}
                        onChange={() => handleOptionChange(q._id, optIdx)}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red', margin: '1em 0' }}>{error}</div>}
      <button type="submit" className="quiz-submit-btn">Submit</button>
    </form>
  );
}

export default QuizQuestions;