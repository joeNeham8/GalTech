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
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
import AdminLayout from './pages/admin/AdminLayout.js';
import CategoriesPage from './pages/admin/CategoriesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Nested Admin Routes */}
        <Route path="/AdminLayout" element={<AdminLayout />}>
        <Route path="categories" element={<CategoriesPage />} />
          {/* Add more nested admin routes here */}
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;







// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from '../pages/LoginPage.js';
// import HomePage from '../pages/HomePage.js';
// import Navbar from './components/Navbar.js';
// import Register from '../pages/Register.js';
// import CategoriesPage from '../pages/CategoriesPage.js';


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [token, setToken] = useState('');

//   const handleLogin = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIsLoggedIn(true);
//         setUserName(data.user.email);
//         setUserRole(data.user.role);
//         setToken(data.token);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error('Network error during login:', error);
//       return false;
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserName('');
//     setUserRole('');
//     setToken('');
//   };

//   return (
//     <Router>
      
//       <div className="App">
//         <Navbar userName={userName} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/home" />
//               ) : (
//                 <LoginPage onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route
//             path="/home"
//             element={
//               isLoggedIn ? (
//                 <HomePage userName={userName} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route
//             path="/CategoriesPage"
//             element={
//               isLoggedIn ? (
//                 <CategoriesPage userRole={userRole} token={token} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
























// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import LoginPage from './components/LoginPage.js';
// // import HomePage from './components/HomePage.js';
// // import Navbar from './components/Navbar.js';
// // import Register from './components/Register.js';
// // import CategoriesPage from './components/CategoriesPage.js';




// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [userName, setUserName] = useState('');
// //   const [userRole, setUserRole] = useState(''); // To store user's role (student/admin)
// //   const [token, setToken] = useState(''); // To store the JWT token

// //   // State to manage which main content page is displayed
// //   const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'categories'

// //   const handleLogin = async (email, password) => {
// //     // This part should mimic your userController.js login logic
// //     try {
// //       const response = await fetch('http://localhost:5000/api/users/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setIsLoggedIn(true);
// //         setUserName(data.user.email); // Use email as username for now, or data.user.name if available
// //         setUserRole(data.user.role); // Store the user's role
// //         setToken(data.token); // Store the JWT token
// //         setCurrentPage('home'); // Navigate to home page after successful login
// //         return true;
// //       } else {
// //         // console.error('Login failed:', data.message);
// //         return false; // Indicate failed login
// //       }
// //     } catch (error) {
// //       console.error('Network error during login:', error);
// //       return false;
// //     }
// //   };

// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setUserName('');
// //     setUserRole('');
// //     setToken('');
// //     setCurrentPage('home'); // Go back to home/login view
// //   };

// //   const navigateToCategories = () => {
// //     setCurrentPage('categories');
// //   };

// //   const navigateToHome = () => {
// //     setCurrentPage('home');
// //   };

// //   return (
// //     <div className="App">
// //       <Navbar userName={userName} onLogout={handleLogout} />

// //       <div className="content-area">
// //         {!isLoggedIn ? (
// //           <LoginPage onLogin={handleLogin} />
// //         ) : (
// //           currentPage === 'home' ? (
// //             <HomePage userName={userName} onNavigateToCategories={navigateToCategories} />
// //           ) : (
// //             <CategoriesPage
// //               userRole={userRole}
// //               token={token}
// //               onBackToHome={navigateToHome}
// //             />
// //           )
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;








// // // function App() {
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [userName, setUserName] = useState('');

// // //   const handleLogin = (email, password) => {
// // //     if (email === 'user@example.com' && password === 'password123') {
// // //       setIsLoggedIn(true);
// // //       setUserName('Student');
// // //       return true;
// // //     } else {
// // //       return false;
// // //     }
// // //   };

 
// // //   return (
// // //     <Router>
// // //       <Navbar userName={userName} onLogout={() => setIsLoggedIn(false)} />
// // //       <div className="container">
// // //         <Routes>
// // //           <Route
// // //             path="/login"
// // //             element={<LoginPage onLogin={handleLogin} />}
// // //           />
// // //           <Route
// // //             path="/"
// // //             element={<HomePage userName={userName} />}
// // //           />
    
// // //         <Route
// // //           path="/signin"
// // //           element={
// // //             isLoggedIn ? (
// // //               <Navigate to="/" />
// // //             ) : (
// // //               <SignIn onSignIn={handleLogin} />
// // //             )
// // //           }/>
// // //      </Routes>
     
// // //   </div>
// // //     </Router>
// // //   );
// // // }
// // // export default App;