import express from 'express';
import cors from 'cors';
import database from "./database.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// Home
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Test route
app.get('/details', (req, res) => {
  res.json({ name: 'Sakshi', age: 20, profession: 'Software Engineer' });
});

// GET signup (for browser)
app.get('/signup', (req, res) => {
  res.send("Signup API works. Use POST request.");
});


// ✅ SIGNUP (SAVE TO SQL)
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  database.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error saving user ❌",
        error: err
      });
    }

    res.json({
      message: "Signup successful ✅"
    });
  });
});


// ✅ SIGNIN (CHECK FROM SQL)
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  database.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server error ❌"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password ❌"
      });
    }

    res.json({
      message: "Login successful ✅",
      user
    });
  });
});


// Server start
app.listen(4000, () => {
  console.log("Server running on port 4000");
});