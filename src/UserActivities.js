// src/UserActivities.js
import React from 'react';

function UserActivities({ activities }) {
    return (
        <div className="user-activities">
            <h2>User Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <h4>{activity.title}</h4>
                        <p>{activity.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserActivities;
