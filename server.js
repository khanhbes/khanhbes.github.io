const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the repository root
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Route for root explicitly in case of any edge cases
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit handling for project directory paths
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects', 'index.html'));
});

app.get('/experience', (req, res) => {
  res.sendFile(path.join(__dirname, 'experience', 'index.html'));
});

app.get('/certificates', (req, res) => {
  res.sendFile(path.join(__dirname, 'certificates', 'index.html'));
});

app.get('/vinfast-battery', (req, res) => {
  res.sendFile(path.join(__dirname, 'vinfast-battery', 'index.html'));
});

app.get('/violation-detect', (req, res) => {
  res.sendFile(path.join(__dirname, 'violation-detect', 'index.html'));
});

app.get('/emotion-recognition', (req, res) => {
  res.sendFile(path.join(__dirname, 'emotion-recognition', 'index.html'));
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
});
