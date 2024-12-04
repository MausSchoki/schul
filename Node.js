const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = []; // Simulierte Datenbank

// Registrierung
app.post('/register', async (req, res) => {
    const { name, email, password, role, klasse } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, name, email, password: hashedPassword, role, klasse };
    users.push(user);
    res.status(201).json({ message: 'User registered!', user });
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(403).json({ message: 'Invalid credentials!' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey');
    res.json({ message: 'Logged in!', token });
});

app.listen(3000, () => console.log('Server running on port 3000'));
