const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET = 'supersecretkey';

// Registrierung
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
        function (err) {
            if (err) return res.status(500).json({ error: 'Nutzer existiert bereits!' });
            res.json({ message: 'Benutzer registriert!', userId: this.lastID });
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ error: 'Ungültige Anmeldedaten!' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
        res.json({ message: 'Erfolgreich eingeloggt!', token });
    });
});

module.exports = router;
