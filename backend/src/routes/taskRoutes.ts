import express from 'express';
import { body } from 'express-validator';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

// Validation middleware
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['todo', 'in-progress', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
];

// Routes
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

export default router;
