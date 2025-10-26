import request from 'supertest';
import { app } from '../../index';
import sqlPool from '../../config/database';
import { describe, expect, it, beforeAll, afterAll, beforeEach } from '@jest/globals';

describe('Todo API Integration Tests', () => {
  beforeEach(async () => {
    // Clear test database before each test
    await sqlPool.execute('DELETE FROM task');
  });

  afterAll(async () => {
    // Final cleanup and close connection
    await sqlPool.execute('DELETE FROM task');
    await sqlPool.end();
  });

  //-----Integration tests for POST /api/v1/todos-----
  describe('POST /api/v1/todos', () => {
    it('should create a new todo', async () => {
      const todo = {
        title: 'Integration Test Todo',
        description: 'Testing the create todo endpoint',
      };

      const response = await request(app)
        .post('/api/v1/todos')
        .send(todo)
        .expect(201);

      expect(response.body).toEqual({
        id: expect.any(Number),
        title: todo.title,
        description: todo.description,
        is_completed: expect.any(Boolean),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    it('should return 400 when title is missing', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send({ description: 'Missing title' })
        .expect(400);

      expect(response.body).toEqual({
        message: 'Title is required and must be a string',
      });
    });

    it('should return 400 when description is missing', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo' })
        .expect(400);

      expect(response.body).toEqual({
        message: 'Description is required and must be a string',
      });
    });
  });
    
  //-----Integration tests for GET /api/v1/todos-----
  describe('GET /api/v1/todos', () => {
    it('should return all todos', async () => {
      const todo = { title: 'Test Todo', description: 'Test Description' };
      await request(app).post('/api/v1/todos').send(todo);

      const response = await request(app)
        .get('/api/v1/todos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toMatchObject({
        id: expect.any(Number),
        title: todo.title,
        description: todo.description,
        is_completed: false,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    it('should return empty array when no todos exist', async () => {
      const response = await request(app)
        .get('/api/v1/todos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });
    
  //-----Integration tests for PATCH /api/v1/todos/:id/complete-----
  describe('PATCH /api/v1/todos/:id/complete', () => {
    it('should mark a todo as completed', async () => {
      const todo = { title: 'Incomplete Todo', description: 'To be completed' };
      const postResponse = await request(app).post('/api/v1/todos').send(todo);
      const todoId = postResponse.body.id;

      const patchResponse = await request(app)
        .patch(`/api/v1/todos/${todoId}/complete`)
        .expect(204);

      expect(patchResponse.body).toEqual({});
    });
    it('should return 400 for invalid todo ID', async () => {
      const response = await request(app)
        .patch('/api/v1/todos/invalid-id/complete')
        .expect(400);

      expect(response.body).toEqual({
        message: 'Invalid todo ID',
      });
    });
    it('should return 404 when completing a non-existent todo', async () => {
      const response = await request(app)
        .patch('/api/v1/todos/9999/complete')
        .expect(404);

      expect(response.body).toEqual({
        message: 'Todo not found',
      });
    });
  });
});