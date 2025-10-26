import sqlPool from '../config/database';
import '@jest/globals';

const initTestDatabase = async () => {
  try {
    // Create test database if it doesn't exist
    await sqlPool.execute(`CREATE DATABASE IF NOT EXISTS todo_db_test`);
    
    // Use the test database
    await sqlPool.execute(`USE todo_db_test`);
    
    // Create the task table if it doesn't exist
    await sqlPool.execute(`
      CREATE TABLE IF NOT EXISTS task (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
};

beforeAll(async () => {
  console.log('Setting up test environment');
  await initTestDatabase();
});

afterAll(async () => {
  // Clean up test data but keep the table structure
  await sqlPool.execute('DELETE FROM task');
  await sqlPool.end();
  console.log('Tearing down test environment');
});