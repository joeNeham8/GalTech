
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const dummyUser = {
  email: "user@example.com",
  password: "password123"
};

// Sign In endpoint
app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  if (email === dummyUser.email && password === dummyUser.password) {
    res.json({ success: true, message: "Sign in successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password." });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Quiz App Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});