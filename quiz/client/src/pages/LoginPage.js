import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for redirection
import '../css/LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate(); // initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Call onLogin to set role and token in App.js
        onLogin(data.user.role, data.token);
        setShowError(false);
        navigate('/'); // redirect to home page
      } else {
        setShowError(true);
      }
    } catch (err) {
      console.error('Login error:', err);
      setShowError(true);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {showError && <p className="error-message">Invalid credentials</p>}
      </form>
    </div>
  );
}

export default LoginPage;
