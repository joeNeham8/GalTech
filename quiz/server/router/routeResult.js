import express from 'express';
import { submitQuiz } from '../controllers/controllerResult.js';

const router = express.Router();

router.post('/submit', submitQuiz); // Submit answers

export default router;
