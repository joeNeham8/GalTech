import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css'; 

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage (set after login/register)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div style={{ padding: '2em' }}>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}<br />
        <strong>Email:</strong> {user.email}<br />
        <strong>Role:</strong> {user.role}<br />
        {user.createdAt && (
          <span>
            <strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      {/* Add profile edit or password change features here */}
    </div>
  );
}

export default Dashboard;