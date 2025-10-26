import { todoService } from '../../services/todo.service';
import sqlPool from '../../config/database';

jest.mock('../../config/database', () => ({
  execute: jest.fn(),
}));

describe('TodoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //-----Unit tests for createTodo-----
  describe('createTodo', () => {
    it('should create a new todo successfully', async () => {
      const mockTodo = {
        title: 'Test Todo',
        description: 'Test Description',
        is_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockResult = [
        { insertId: 1 },
        undefined
      ];

      (sqlPool.execute as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await todoService.createTodo(mockTodo);

      expect(result).toEqual({
        id: 1,
        ...mockTodo,
      });
      expect(sqlPool.execute).toHaveBeenCalledWith(
        expect.any(String),
        [mockTodo.title, mockTodo.description, mockTodo.is_completed, mockTodo.created_at, mockTodo.updated_at]
      );
    });

    it('should throw an error when database query fails', async () => {
      const mockTodo = {
        title: 'Test Todo',
        description: 'Test Description',
        is_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      (sqlPool.execute as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(todoService.createTodo(mockTodo)).rejects.toThrow('Failed to create todo');
    });
  });

  //-----Unit tests for getTodos-----
  describe('getTodos', () => {
    it('should return all todos successfully', async () => {
      const mockTodos = [
        {
          id: 1,
          title: 'Test Todo 1',
          description: 'Description 1',
          is_completed: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          title: 'Test Todo 2',
          description: 'Description 2',
          is_completed: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      (sqlPool.execute as jest.Mock).mockResolvedValueOnce([mockTodos]);

      const result = await todoService.getTodos();

      expect(result).toEqual(mockTodos);
      expect(sqlPool.execute).toHaveBeenCalledWith(
        expect.any(String)
      );
    });

    it('should throw an error when database query fails', async () => {
      (sqlPool.execute as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(todoService.getTodos()).rejects.toThrow('Failed to fetch todos');
    });
  });

  //-----Unit tests for completeTodo-----
  describe('completeTodo', () => {
    it('should mark a todo as completed successfully', async () => {
        const todoId = 1;
        (sqlPool.execute as jest.Mock).mockResolvedValueOnce([ { affectedRows: 1 } ]);

        await expect(todoService.completeTodo(todoId)).resolves.toBeUndefined();
        expect(sqlPool.execute).toHaveBeenCalledWith(
            expect.any(String),
            [true, todoId]
        );
    });

    it('should throw an error when the todo to complete does not exist', async () => {
        const todoId = 999;
        (sqlPool.execute as jest.Mock).mockResolvedValueOnce([{ affectedRows: 0 }]);
        await expect(todoService.completeTodo(todoId)).rejects.toThrow('Todo not found');
    });

    it('should throw an error when database query fails', async () => {
        const todoId = 1;
        (sqlPool.execute as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        await expect(todoService.completeTodo(todoId)).rejects.toThrow('Failed to complete todo');
    });
  });

  //-----Unit tests for removeTodo-----
  describe('removeTodo', () => {
    it('should remove a todo successfully', async () => {
        const todoId = 1;
      (sqlPool.execute as jest.Mock).mockResolvedValueOnce([{ affectedRows: 1 }]);
      
        await expect(todoService.removeTodo(todoId)).resolves.toBeUndefined();
        expect(sqlPool.execute).toHaveBeenCalledWith(
            expect.any(String),
            [todoId]
        );
    });

    it('should throw an error when the todo to remove does not exist', async () => {
        const todoId = 999;
      (sqlPool.execute as jest.Mock).mockResolvedValueOnce([{ affectedRows: 0 }]);
        await expect(todoService.removeTodo(todoId)).rejects.toThrow('Todo not found');
    });

    it('should throw an error when database query fails', async () => {
        const todoId = 1;
      (sqlPool.execute as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        await expect(todoService.removeTodo(todoId)).rejects.toThrow('Failed to remove todo');
    });
  });
});