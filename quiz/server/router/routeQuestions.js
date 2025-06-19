import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../controllers/controllerQuestion.js';

const router = express.Router();
router.post('/:categoryId/questions', createQuestion); // optional: protect this with admin middleware
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion); // optional: protect this with admin
router.delete('/:id', deleteQuestion); // optional: protect this with admin

export default router;
