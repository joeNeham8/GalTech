
import express from 'express';
const router = express.Router();
import { addCategory, getAllCategories, deleteCategory } from '../controllers/controllerCategory.js';
// import { protect, authorize } from '../middleware/authMiddleware.js'; // Assuming you'll have auth middleware

// Admin routes
// router.post('/', protect, authorize('admin'), addCategory);
// router.delete('/:id', protect, authorize('admin'), deleteCategory);

// Public/Student routes
router.post('/', addCategory); // Temporarily public for testing, apply auth later
router.delete('/:id', deleteCategory); // Temporarily public for testing, apply auth later
router.get('/', getAllCategories);

export default router;
