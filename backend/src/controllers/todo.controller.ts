import { Request, Response } from 'express';
import { todoService } from '../services/todo.service';


//-----Create a new todo-----
export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ message: 'Title is required and must be a string' });
        }
        if (!description || typeof description !== 'string') {
            return res.status(400).json({ message: 'Description is required and must be a string' });
        }

        const todo = await todoService.createTodo({
            title: title.trim(),
            description: description.trim(),
            is_completed: false,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//-----Get all todos-----
export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await todoService.getTodos();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//-----Complete a todo-----
export const completeTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        await todoService.completeTodo(Number(id));
        res.status(204).json({ message: 'Todo completed successfully' });
    } catch (error) {
        console.error('Error completing todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
