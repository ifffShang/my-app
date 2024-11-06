// src/UserData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import UserActivities from './UserActivities';

function UserData() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch Users Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(userResponse.data);

        const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(postResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Data</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>

          <p>Phone: {user.phone}</p>

          <h4>Posts:</h4>
          <ul>
            {posts
              .filter((post) => post.userId === user.id)
              .map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UserData;
