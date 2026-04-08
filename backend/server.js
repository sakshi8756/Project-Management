import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});


app.get('/details', (req, res) => {
  res.json({ name: 'Sakshi', age: 20, profession: 'Software Engineer' });
});


app.get('/signup', (req, res) => {
  res.send("Signup API works. Use POST request.");
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received Data:", req.body);
  res.json({
    message: "Signup successful ✅",
    user: { name, email }
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log("Login Data:", req.body);

  if (email === "test@gmail.com" && password === "1234") {
    return res.json({
      message: "Login successful ✅",
      user: { email }
    });
  }

  res.status(401).json({
    message: "Invalid email or password ❌"
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log("Login Data:", req.body);

  if (email === "test@gmail.com" && password === "1234") {
    return res.json({
      message: "Login successful ✅",
      user: { email }
    });
  }

  res.status(401).json({
    message: "Invalid email or password ❌"
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});