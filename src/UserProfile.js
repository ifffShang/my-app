// src/UserProfile.js
import React from 'react';

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

export default UserProfile;
