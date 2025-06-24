import express from 'express';
import { submitQuiz,getUserResults } from '../controllers/controllerResult.js';

const router = express.Router();

router.post('/submit', submitQuiz);
router.get('/user/:userId', getUserResults); // Submit answers

export default router;
