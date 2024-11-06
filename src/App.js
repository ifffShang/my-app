// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserActivities from './UserActivities';
import './App.css';
const basename = process.env.NODE_ENV === "production" ? "/my-app" : "";


async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
}

async function fetchUserActivities() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
}

function UserList({ users }) {
    return (
        <div className="user-list">
            <h2>Users</h2>
            {users.map((user) => (
                <div key={user.id} className="user-item">
                    <UserProfile user={user} />
                    <Link to={`/users/${user.id}`}>
                        <button>View Activities</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

function UserActivitiesPage({ activities }) {
    const { userId } = useParams();
    const userActivities = activities.filter(activity => activity.userId === parseInt(userId, 10));

    return (
        <div>
            <Link to="/">
                <button>Back to Users List</button>
            </Link>
            <UserActivities activities={userActivities} />
        </div>
    );
}

function App() {
    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const usersData = await fetchUsers();
                const activitiesData = await fetchUserActivities();
                setUsers(usersData);
                setActivities(activitiesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Router basename={basename}>
            <Routes >
                <Route path="/" element={<UserList users={users} />} />
                <Route path="/users/:userId" element={<UserActivitiesPage activities={activities} />} />
                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
        </Router>
    );
}

export default App;
