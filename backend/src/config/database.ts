import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load the appropriate .env file based on NODE_ENV
const envPath = process.env.NODE_ENV === 'test' 
  ? path.resolve(__dirname, '../../__tests__/.env.test')
  : path.resolve(__dirname, '../../.env');

console.log('Loading environment from:', envPath);
dotenv.config({ path: envPath });

const baseConfig = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Create database if it doesn't exist and create task table
const dbName = process.env.NODE_ENV === 'test' ? 'todo_db_test' : process.env.MYSQL_DATABASE;
const setup = async () => {
    // First create a connection without database selected
    const tempPool = mysql.createPool(baseConfig);
    
    try {
        await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        await tempPool.query(`USE ${dbName}`);
        await tempPool.query(`
            CREATE TABLE IF NOT EXISTS task (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                is_completed BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error('Error setting up database:', error);
        throw error;
    } finally {
        await tempPool.end();
    }
};

setup().catch(console.error);

// Create the main pool with database selected
const poolConfig = {
    ...baseConfig,
    database: dbName,
};

console.log('Database config:', { ...poolConfig, password: '****' });

const sqlPool = mysql.createPool(poolConfig);

export default sqlPool;