import express from 'express';
import mysql from 'mysql2/promise'
import todoRoutes from './routes/todo.routes';
import sqlPool from '../src/config/database';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1', todoRoutes);

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

app.listen(PORT, async () => {
    await initializeDB();
    console.log(`Server is running on port ${PORT}`);
});
