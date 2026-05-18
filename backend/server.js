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
  const { name, description, userId, members } = req.body;

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

    // add selected members
    if (members && members.length > 0) {
      members.forEach(memberId => {
        if (memberId !== userId) {
          database.query(
            "INSERT INTO project_members (user_id, project_id, role) VALUES (?, ?, 'member')",
            [memberId, projectId]
          );
        }
      });
    }

    res.json({
      message: "Project created ✅",
      projectId
    });
  });
});

// ✅ ADD MEMBER
app.post('/add-member', (req, res) => {
  const { userId, projectId, role } = req.body;

  const sql = "INSERT INTO project_members (user_id, project_id, role) VALUES (?, ?, ?)";

  database.query(sql, [userId, projectId, role || 'member'], (err) => {
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

// ✅ GET USER'S PROJECTS (projects where user is a member)
app.get('/user-projects/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT p.*, pm.role 
    FROM projects p 
    JOIN project_members pm ON p.id = pm.project_id 
    WHERE pm.user_id = ?
    ORDER BY p.created_at DESC
  `;

  database.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user projects ❌" });
    }

    res.json(result);
  });
});

// ✅ GET SINGLE PROJECT
app.get('/project/:id', (req, res) => {
  const id = req.params.id;

  database.query("SELECT * FROM projects WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error ❌" });

    if (result.length === 0) {
      return res.status(404).json({ message: "Project not found ❌" });
    }

    res.json(result[0]);
  });
});

// ✅ GET PROJECT MEMBERS with progress
app.get('/project-members/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  const sql = `
    SELECT 
      u.id, u.name, u.email, pm.role,
      (SELECT COUNT(*) FROM tasks t WHERE t.project_id = ? AND t.user_id = u.id) as total_tasks,
      (SELECT COUNT(*) FROM tasks t WHERE t.project_id = ? AND t.user_id = u.id AND t.is_completed = true) as completed_tasks
    FROM project_members pm
    JOIN users u ON pm.user_id = u.id
    WHERE pm.project_id = ?
  `;

  database.query(sql, [projectId, projectId, projectId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching members ❌" });
    }

    const members = result.map(m => ({
      ...m,
      progress: m.total_tasks > 0 ? Math.round((m.completed_tasks / m.total_tasks) * 100) : 0
    }));

    res.json(members);
  });
});

// ✅ GET USER ROLE IN PROJECT
app.get('/user-role/:projectId/:userId', (req, res) => {
  const { projectId, userId } = req.params;

  database.query(
    "SELECT role FROM project_members WHERE project_id = ? AND user_id = ?",
    [projectId, userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error ❌" });

      if (result.length === 0) {
        return res.status(404).json({ message: "Not a member ❌" });
      }

      res.json({ role: result[0].role });
    }
  );
});

// ✅ GET ALL USERS (for member selection)
app.get('/users', (req, res) => {
  database.query("SELECT id, name, email FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Error ❌" });

    res.json(result);
  });
});

// ✅ CREATE TASK
app.post('/create-task', (req, res) => {
  const { projectId, userId, title } = req.body;

  const sql = "INSERT INTO tasks (project_id, user_id, title) VALUES (?, ?, ?)";

  database.query(sql, [projectId, userId, title], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating task ❌" });
    }

    res.json({ message: "Task created ✅" });
  });
});

// ✅ GET TASKS FOR A PROJECT
app.get('/tasks/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  const sql = `
    SELECT t.*, u.name as assigned_to_name 
    FROM tasks t 
    JOIN users u ON t.user_id = u.id 
    WHERE t.project_id = ?
    ORDER BY t.created_at DESC
  `;

  database.query(sql, [projectId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error ❌" });

    res.json(result);
  });
});

// ✅ GET TASKS FOR A SPECIFIC USER IN A PROJECT
app.get('/tasks/:projectId/:userId', (req, res) => {
  const { projectId, userId } = req.params;

  const sql = "SELECT * FROM tasks WHERE project_id = ? AND user_id = ? ORDER BY created_at DESC";

  database.query(sql, [projectId, userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error ❌" });

    res.json(result);
  });
});

// ✅ TOGGLE TASK COMPLETION
app.put('/toggle-task/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  database.query(
    "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?",
    [taskId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error ❌" });

      res.json({ message: "Task toggled ✅" });
    }
  );
});

// ✅ DELETE PROJECT
app.delete('/delete-project/:id', (req, res) => {
  const id = req.params.id;

  database.query("DELETE FROM projects WHERE id = ?", [id], (err) => {
    if (err) return res.send(err);

    res.json({ message: "Deleted ✅" });
  });
});

// Server start
app.listen(4000, () => {
  console.log("Server running on port 4000 🚀");
});
