const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Database Connection using Environment Variables (Best practice for K8s)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'voting_db',
    waitForConnections: true,
    connectionLimit: 10
});

// API: Get current vote counts
app.get('/results', (req, res) => {
    db.query('SELECT candidate, COUNT(*) as votes FROM votes GROUP BY candidate', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API: Cast a vote
app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    db.query('INSERT INTO votes (candidate) VALUES (?)', [candidate], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Vote Registered');
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Voting app listening on port ${PORT}`));