// import React, { useState } from "react";
// import "../css/SignIn.css"; 

// const SignIn = ({ onSignIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simple validation
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setError("");
//     // Call parent handler or API here
//     if (onSignIn) {
//       onSignIn({ email, password });
//     }
//   };

//   return (
//     <div className="signin-container">
//       <form className="signin-form" onSubmit={handleSubmit}>
//         <h2>Sign In</h2>
//         {error && <div className="signin-error">{error}</div>}
//         <div className="signin-field">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="signin-field">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit" className="signin-button">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;

// RegistrationForm.js
import { useState } from 'react';

function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setMessage('Registration successful! Please log in.');
      else setMessage(data.message || 'Registration failed.');
    } catch {
      setMessage('Server error.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
      <div>{message}</div>
    </form>
  );
}

export default RegistrationForm;