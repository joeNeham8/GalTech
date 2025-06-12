import { useState } from 'react';
import '../css/Register.css'; // This path expects the CSS file to be in 'src/css/'

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
      if (res.ok) {
        setMessage('Registration successful! Please log in.');
        // Optionally clear the form after successful registration
        setForm({ name: '', email: '', password: '', role: 'student' });
      }
      else setMessage(data.message || 'Registration failed.');
    } catch (error) {
      console.error("Registration fetch error:", error);
      setMessage('Server error.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="input-field"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-field"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="input-field"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-field"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="registration-button">Register</button>
        {message && (
          <div className={`registration-message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;




// import { useState } from 'react';
// import '../css/Register.css'; 

// function RegistrationForm() {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
//   const [message, setMessage] = useState('');

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) setMessage('Registration successful! Please log in.');
//       else setMessage(data.message || 'Registration failed.');
//     } catch {
//       setMessage('Server error.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
//       <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
//       <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
//       <select name="role" value={form.role} onChange={handleChange}>
//         <option value="student">Student</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button type="submit">Register</button>
//       <div>{message}</div>
//     </form>
//   );
// }

// export default RegistrationForm;