import React, { useEffect, useState } from 'react';

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
    <div className="dashboard-container" style={{ maxWidth: 500, margin: '2em auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: '2em' }}>
      <h2>User Profile</h2>
      <div style={{ marginBottom: '1.5em' }}>
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