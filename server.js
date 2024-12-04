const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const gradeRoutes = require('./routes/grades');
const scheduleRoutes = require('./routes/schedule');
const fileRoutes = require('./routes/files');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/grades', gradeRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/files', fileRoutes);

// Server starten
app.listen(3000, () => console.log('Server läuft auf http://localhost:3000'));
