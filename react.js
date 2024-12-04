import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Einloggen</button>
        </div>
    );
};

export default Login;
