import { Router } from 'express';
import { createTodo } from '../controllers/todo.controller';

const router = Router();

//create todo
router.post('/todos', createTodo);

export default router;