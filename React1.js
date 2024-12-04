import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/dashboard', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
        };
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Willkommen</h1>
            {userData && <p>Hallo, {userData.name}!</p>}
        </div>
    );
};

export default Dashboard;
