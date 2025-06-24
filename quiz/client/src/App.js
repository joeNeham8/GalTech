import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Home from './pages/HomePage.js';
import Login from './pages/LoginPage.js';
import Register from './pages/Register.js';
import Quiz from './pages/Quiz/Quiz.js';
import QuizQuestions from './pages/Quiz/QuizQuestions.js';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
import AdminLayout from './pages/admin/AdminLayout.js';
import CategoriesPage from './pages/admin/CategoriesPage.js';
import QuestionsPage from './pages/admin/QuestionsPage.js';

import './css/App.css';

function App() {
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState('');

  // Load user role and token from localStorage on initial render
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedToken = localStorage.getItem('token');
    if (savedRole && savedToken) {
      setUserRole(savedRole);
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (role, jwtToken) => {
    setUserRole(role);
    setToken(jwtToken);
    localStorage.setItem('userRole', role);
    localStorage.setItem('token', jwtToken);
  };

  const isAdmin = userRole === 'admin';

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/quiz" element={<Quiz />}>
          <Route path=":categoryId/questions" element={<QuizQuestions />} /> 
        </Route>
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route
          path="/adminLayout"
          element={<AdminLayout userRole={userRole} userName="Admin" />}
        >
          <Route
            path="categories"
            element={
              isAdmin ? (
                <CategoriesPage userRole={userRole} token={token} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/adminLayout/categories/:categoryId/questions"
            element={
              <QuestionsPage
                userRole={userRole}
                token={token}
                onBackToCategories={() => Navigate('/adminLayout/categories')}
              />
            }
          />

         <Route
            path="/adminLayout/categories/:categoryId/subcategories/:subCategoryName/questions"
            element={
              <QuestionsPage
                userRole={userRole}
                token={token}
                onBackToCategories={() => Navigate('/adminLayout/categories')}
              />
            }
          />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
