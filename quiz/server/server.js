
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// connection file import
import connect from "./database/conn.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const dummyUser = {
  email: "user@example.com",
  password: "password123"
};

connect();
// Routes
app.use("/api", router);



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







// password eFfv5spvg3YWkg1g