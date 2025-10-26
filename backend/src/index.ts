import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import sqlPool from '../src/config/database';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/api/v1', todoRoutes);

export { app };

// MySQL connection pool
let mysqlPool: mysql.Pool;

async function initializeDB() {
  try {
    mysqlPool = sqlPool;
    console.log('MySQL pool created');

    // Create tables if not exists
    const connection = await mysqlPool.getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS task (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, async () => {
        await initializeDB();
        console.log(`Server is running on port ${PORT}`);
    });
}
