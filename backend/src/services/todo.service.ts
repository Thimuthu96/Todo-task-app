import { Todo } from '../types/todo.types';
import sqlPool from '../config/database';
import { ResultSetHeader } from 'mysql2';

class TodoService {
    async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
        const { title, description, is_completed, created_at, updated_at } = todo;
        
        try {
            const [result] = await sqlPool.execute<ResultSetHeader>(
                'INSERT INTO task (title, description, is_completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
                [title, description, is_completed, created_at, updated_at]
            );

            return {
                id: result.insertId,
                ...todo
            };
        } catch (error) {
            throw new Error('Failed to create todo');
        }
    }
}

export const todoService = new TodoService();