Quiz Application
A full-stack web application designed to provide an interactive quiz experience with user authentication, role-based access (Student vs. Admin), dynamic quiz categories, question management, and score tracking.

🌟 Features
This project implements the core functionalities of a comprehensive quiz platform:

User Authentication (Basic):

User Registration (Email & Password)

User Login (Email & Password)

Role-Based Access Control (student vs. admin roles)

Password Hashing with bcrypt.js

JWT-based Login Sessions

Token storage in localStorage for session persistence

Protected Frontend Routes (Admin panel, Quiz, Results, Dashboard)

Quiz Categories Management:

Admin: Add, View, and Delete quiz categories.

Student: View available quiz categories.

Question Management (MCQs, Program-Based, Coding Challenge):

Admin: Add, View (all or by ID), Update, and Delete Multiple Choice Questions (MCQs), Program-Based Questions (with code snippets), and Coding Challenge Questions (with sample input/output).

Quiz Attempt & Scoring:

Start a quiz by selecting a category.

Select answers for MCQs.

Submit the completed quiz.

View score and a basic result summary immediately after submission.

Attempt History:

Save each quiz attempt with userId, quiz category, score, totalQuestions, correctAnswers, and a detailed breakdown of answersSubmitted.

(Future: Dashboard view of previous attempts.)

Admin Panel:

Dedicated interface for administrators.

Links to manage quiz categories and questions.

(Future: View student attempts and scores, overall leaderboard.)
