import React from 'react';
// import '../../css/QuizQuestions.css'; // Optional: if you create a separate CSS for this component

function QuizQuestions({ questions }) {
  if (!questions.length) {
    return <p>No questions added in this category.</p>;
  }

  return (
    <ul className="quiz-questions-list">
      {questions.map(q => (
        <li key={q._id} className="quiz-question-item">
          <strong className="question-text">Q:</strong> <span className="question-text-content">{q.questionText}</span> {/* CORRECTED: q.question to q.questionText */}
          {q.options && q.options.length > 0 && ( // Ensure options exist before mapping
            <ol type="A" className="question-options-list">
              {q.options.map((opt, idx) => (
                <li key={idx} className="question-option-item">{opt}</li>
              ))}
            </ol>
          )}
          {/* Add rendering for codeSnippet, sampleInput/Output if needed based on q.type */}
          {q.type === 'program_based' && q.codeSnippet && (
            <pre className="question-code-snippet"><code>{q.codeSnippet}</code></pre>
          )}
          {q.type === 'coding_challenge' && q.sampleInput && q.sampleOutput && (
            <div className="question-challenge-info">
              <p><strong>Sample Input:</strong> <pre><code>{q.sampleInput}</code></pre></p>
              <p><strong>Sample Output:</strong> <pre><code>{q.sampleOutput}</code></pre></p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default QuizQuestions;
