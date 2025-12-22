const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
  })
);

const logsFilePath = path.join(__dirname, 'logs.json');

app.get('/logs', (req, res) => {
  try {
    const raw = fs.readFileSync(logsFilePath, 'utf8');
    const clean = raw.replace(/^\uFEFF/, '');
    const data = JSON.parse(clean);
    res.json(data);
  } catch (err) {
    console.error('LOG READ ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
