const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
// Ensure your index.html is inside a folder named 'public'
app.use(express.static('public'));

// Database Connection using Environment Variables
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // FALLBACK: If DB_NAME isn't set in K8s, it uses 'voting_db'
    database: process.env.DB_NAME || 'voting_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection on startup
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ ERROR: Could not connect to RDS Instance:', err.message);
    } else {
        console.log('✅ SUCCESS: Connected to RDS Database');
        connection.release();
    }
});

// API: Get current vote counts
app.get('/results', (req, res) => {
    db.query('SELECT candidate, COUNT(*) as votes FROM votes GROUP BY candidate', (err, results) => {
        if (err) {
            console.error('❌ Error fetching results:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// API: Cast a vote
app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    if (!candidate) return res.status(400).send('No candidate selected');

    db.query('INSERT INTO votes (candidate) VALUES (?)', [candidate], (err) => {
        if (err) {
            console.error('❌ Error saving vote:', err);
            return res.status(500).send('Vote storage failed');
        }
        console.log(`🗳️ Vote registered for: ${candidate}`);
        res.status(201).send('Vote Registered');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Voting app listening on port ${PORT}`);
    console.log(`📍 Connecting to host: ${process.env.DB_HOST}`);
});