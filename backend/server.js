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

// ✅ CREATE PROJECT
app.post('/create-project', (req, res) => {
  const { name, description, userId } = req.body;

  const sql = "INSERT INTO projects (project_name, description, created_by) VALUES (?, ?, ?)";

  database.query(sql, [name, description, userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating project ❌"
      });
    }

    const projectId = result.insertId;

    // make creator admin
    database.query(
      "INSERT INTO project_members (user_id, project_id, role) VALUES (?, ?, 'admin')",
      [userId, projectId]
    );

    res.json({
      message: "Project created ✅"
    });
  });
});

// ✅ ADD MEMBER
app.post('/add-member', (req, res) => {
  const { userId, projectId, role } = req.body;

  const sql = "INSERT INTO project_members (user_id, project_id, role) VALUES (?, ?, ?)";

  database.query(sql, [userId, projectId, role], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error adding member ❌"
      });
    }

    res.json({
      message: "Member added ✅"
    });
  });
});

// ✅ GET ALL PROJECTS
app.get('/projects', (req, res) => {
  const sql = "SELECT * FROM projects";

  database.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error ❌" });
    }

    res.json(result);
  });
});

// Server start
app.listen(4000, () => {
  console.log("Server running on port 4000");
});