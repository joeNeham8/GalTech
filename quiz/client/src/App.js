import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import Navbar from './components/Navbar.js';
import SignIn from './components/SignIn.js';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (email, password) => {
    if (email === 'user@example.com' && password === 'password123') {
      setIsLoggedIn(true);
      setUserName('Student');
      return true;
    } else {
      return false;
    }
  };

 
  return (
    <Router>
      <Navbar userName={userName} onLogout={() => setIsLoggedIn(false)} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={<HomePage userName={userName} />}
          />
    
        <Route
          path="/signin"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignIn onSignIn={handleLogin} />
            )
          }/>
     </Routes>
     
  </div>
    </Router>
  );
}
export default App;