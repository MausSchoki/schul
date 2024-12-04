const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./school.db');

// Tabellen erstellen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        subject TEXT,
        grade TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class TEXT,
        subject TEXT,
        teacher TEXT,
        time TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        uploadedBy INTEGER,
        FOREIGN KEY (uploadedBy) REFERENCES users(id)
    )`);
});

module.exports = db;
