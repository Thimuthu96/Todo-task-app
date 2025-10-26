import { Router } from 'express';
import { createTodo, getTodos } from '../controllers/todo.controller';

const router = Router();

// Get all todos
router.get('/todos', getTodos);

// Create todo
router.post('/todos', createTodo);

export default router;