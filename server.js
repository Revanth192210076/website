const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ipo_db',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query('INSERT INTO registrations (name, email) VALUES ($1, $2)', [name, email]);
    res.redirect('/next.html');
  } catch (err) {
    console.error(err);
    res.send('Error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
