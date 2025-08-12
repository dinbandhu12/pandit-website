require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful!');
    console.log('Current time from DB:', result.rows[0].now);
    
    // Test posts table
    const postsResult = await pool.query('SELECT COUNT(*) FROM posts');
    console.log('Number of posts in database:', postsResult.rows[0].count);
    
    await pool.end();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testDatabase();




