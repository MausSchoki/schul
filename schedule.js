const express = require('express');
const db = require('../database');
const router = express.Router();

// Stundenplan anzeigen
router.get('/:class', (req, res) => {
    const { class: className } = req.params;

    db.all('SELECT * FROM schedule WHERE class = ?', [className], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Fehler beim Abrufen des Stundenplans' });
        res.json(rows);
    });
});

// Stundenplan hinzufügen
router.post('/', (req, res) => {
    const { class: className, subject, teacher, time } = req.body;

    db.run('INSERT INTO schedule (class, subject, teacher, time) VALUES (?, ?, ?, ?)', [className, subject, teacher, time], (err) => {
        if (err) return res.status(500).json({ error: 'Fehler beim Hinzufügen zum Stundenplan' });
        res.json({ message: 'Eintrag hinzugefügt!' });
    });
});

module.exports = router;
