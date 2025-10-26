import { Todo } from '../types/todo.types';
import sqlPool from '../config/database';
import mysql from 'mysql2/promise';

class TodoService {

    //-----Create a new todo-----
    async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
        const { title, description, is_completed, created_at, updated_at } = todo;
        
        try {
            const [result] = await sqlPool.execute<mysql.ResultSetHeader>(
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

    //-----Get all todos-----
    async getTodos(): Promise<Todo[]> {
        try {
            const [rows] = await sqlPool.execute<mysql.RowDataPacket[]>(
                'SELECT id, title, description, is_completed, created_at, updated_at FROM task ORDER BY created_at DESC'
            );

            const todos = (rows as any[]).map(todo => ({
                ...todo,
                is_completed: Boolean(todo.is_completed),
            }));
            
            return todos as Todo[];
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw new Error('Failed to fetch todos');
        }
    }

    //-----Complete a todo-----
    async completeTodo(id: number): Promise<void> {
        try {
            const [result] = await sqlPool.execute<mysql.ResultSetHeader>(
                'UPDATE task SET is_completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [true, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Todo not found');
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'Todo not found') {
                throw error;
            }
            throw new Error('Failed to complete todo');
        }
    }
}

export const todoService = new TodoService();