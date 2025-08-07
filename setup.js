#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Blog Website...\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Create necessary directories
const dirs = ['backend', 'frontend'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  
  console.log('Installing frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  
  console.log('✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Create environment files
console.log('\n🔧 Setting up environment files...');

const backendEnvPath = path.join(__dirname, 'backend', '.env');
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');

const backendEnvContent = `# Database Configuration (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
`;

const frontendEnvContent = `# API Configuration
VITE_API_URL=http://localhost:3001
`;

if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('✅ Created backend/.env (please update with your database URL)');
} else {
  console.log('ℹ️  backend/.env already exists');
}

if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Created frontend/.env');
} else {
  console.log('ℹ️  frontend/.env already exists');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update backend/.env with your Neon PostgreSQL connection string');
console.log('2. Run "npm run dev" to start both frontend and backend');
console.log('3. Visit http://localhost:5173 to see your blog');
console.log('4. Visit http://localhost:5173/blog-posts-admin to access admin panel');
console.log('   (username: admin, password: admin)');
console.log('\n📚 For deployment instructions, see DEPLOYMENT.md'); 