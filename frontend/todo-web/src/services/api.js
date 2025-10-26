import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTask: async (task) => {
    const response = await api.post('/todos', task);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/todos/${taskId}`);
    return response.data;
  },

  completeTask: async (taskId) => {
    const response = await api.patch(`/todos/${taskId}/complete`);
    return response.data;
  },
};

export default api;