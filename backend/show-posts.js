require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function showPosts() {
  try {
    console.log('📝 Fetching posts from your database...\n');
    
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    
    if (result.rows.length === 0) {
      console.log('❌ No posts found in database.');
    } else {
      console.log(`✅ Found ${result.rows.length} post(s):\n`);
      
      result.rows.forEach((post, index) => {
        console.log(`📄 Post #${index + 1} (ID: ${post.id})`);
        console.log(`   Title: ${post.title}`);
        console.log(`   Subtitle: ${post.subtitle || 'N/A'}`);
        console.log(`   Tags: ${post.tags || 'N/A'}`);
        console.log(`   Links: ${post.links || 'N/A'}`);
        console.log(`   Created: ${new Date(post.created_at).toLocaleString()}`);
        console.log(`   Updated: ${new Date(post.updated_at).toLocaleString()}`);
        console.log(`   Content Preview: ${post.content.substring(0, 100)}...`);
        console.log('   ' + '─'.repeat(50));
      });
    }
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
  }
}

showPosts();




