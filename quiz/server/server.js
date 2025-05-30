import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './router/routeUser.js';
import questionRoutes from './router/routeQuestions.js';
import resultRoutes from './router/routeResult.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URL, {
  dbName: 'quiz'
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

// Root route
app.get('/', (req, res) => {
  res.send(' Quiz App Backend is Running!');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));



// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import router from "./router/route.js";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// // connection file import
// import connect from "./database/conn.js";

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());


// const dummyUser = {
//   email: "user@example.com",
//   password: "password123"
// };

// connect();
// // Routes
// app.use("/api", router);



// // Sign In endpoint
// app.post("/api/signin", (req, res) => {
//   const { email, password } = req.body;
//   if (email === dummyUser.email && password === dummyUser.password) {
//     res.json({ success: true, message: "Sign in successful!" });
//   } else {
//     res.status(401).json({ success: false, message: "Invalid email or password." });
//   }
// });

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Quiz App Server is running.");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });







