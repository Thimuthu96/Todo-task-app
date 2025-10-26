import { Router } from 'express';
import { createTodo, getTodos, completeTodo, removeTodo } from '../controllers/todo.controller';

const router = Router();

//-----Create todo-----
router.post('/todos', createTodo);

//-----Get all todos-----
router.get('/todos', getTodos);

//-----Complete todo-----
router.patch('/todos/:id/complete', completeTodo);

//-----Remove todo-----
router.delete('/todos/:id', removeTodo);



export default router;