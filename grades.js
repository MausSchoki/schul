const express = require('express');
const db = require('../database');
const router = express.Router();

// Noten abrufen
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    db.all('SELECT * FROM grades WHERE userId = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Fehler beim Abrufen der Noten' });
        res.json(rows);
    });
});

// Note hinzufügen
router.post('/', (req, res) => {
    const { userId, subject, grade } = req.body;

    db.run('INSERT INTO grades (userId, subject, grade) VALUES (?, ?, ?)', [userId, subject, grade], (err) => {
        if (err) return res.status(500).json({ error: 'Fehler beim Hinzufügen der Note' });
        res.json({ message: 'Note hinzugefügt!' });
    });
});

module.exports = router;
