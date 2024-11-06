// src/UserList.js
import React from 'react';

function UserList({ users, activities }) {
    return (
        <div className="user-list">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <p><strong>{user.name}</strong></p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>

                        <h3>Posts:</h3>
                        <ul className="user-posts">
                            {activities
                                .filter((activity) => activity.userId === user.id)
                                .map((activity) => (
                                    <li key={activity.id}>
                                        <h4>{activity.title}</h4>
                                        <p>{activity.body}</p>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
