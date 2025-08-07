-- Sample blog posts for testing
-- Run this after setting up your database

INSERT INTO posts (title, subtitle, content, tags, links) VALUES
(
  'Getting Started with React and Vite',
  'A comprehensive guide to building modern web applications',
  '<h2>Introduction</h2><p>React has revolutionized the way we build user interfaces. With the introduction of Vite, the development experience has become even more seamless and efficient.</p><h3>Why Vite?</h3><p>Vite provides lightning-fast hot module replacement (HMR) and instant server start. It leverages native ES modules in the browser and esbuild for pre-bundling dependencies.</p><h3>Key Features</h3><ul><li>Instant server start</li><li>Lightning fast HMR</li><li>Rich features out of the box</li><li>Optimized builds</li></ul><h2>Setting Up Your Project</h2><p>To create a new React project with Vite, run:</p><pre><code>npm create vite@latest my-react-app -- --template react</code></pre><p>This will create a new project with all the necessary dependencies and configuration.</p>',
  'react, vite, javascript, web development',
  'https://vitejs.dev/, https://react.dev/'
),
(
  'The Power of Tailwind CSS',
  'How utility-first CSS can transform your development workflow',
  '<h2>What is Tailwind CSS?</h2><p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs.</p><h3>Benefits</h3><ul><li>Rapid development</li><li>Consistent design system</li><li>Smaller bundle sizes</li><li>Highly customizable</li></ul><h2>Getting Started</h2><p>Install Tailwind CSS in your project:</p><pre><code>npm install -D tailwindcss postcss autoprefixer</code></pre><p>Initialize your configuration:</p><pre><code>npx tailwindcss init -p</code></pre><h3>Configuration</h3><p>Tailwind is highly configurable. You can customize colors, spacing, typography, and more in your <code>tailwind.config.js</code> file.</p>',
  'css, tailwind, design, frontend',
  'https://tailwindcss.com/, https://tailwindcss.com/docs'
),
(
  'Building REST APIs with Node.js and Express',
  'A practical guide to creating robust backend services',
  '<h2>Introduction to REST APIs</h2><p>REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods to perform operations on resources.</p><h3>HTTP Methods</h3><ul><li><strong>GET:</strong> Retrieve data</li><li><strong>POST:</strong> Create new data</li><li><strong>PUT:</strong> Update existing data</li><li><strong>DELETE:</strong> Remove data</li></ul><h2>Setting Up Express</h2><p>First, install Express:</p><pre><code>npm install express</code></pre><p>Create a basic server:</p><pre><code>const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.json({ message: "Hello World!" });\n});\n\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});</code></pre><h3>Middleware</h3><p>Express middleware functions have access to the request and response objects. They can modify the request and response objects, end the request-response cycle, or call the next middleware function.</p>',
  'nodejs, express, api, backend, javascript',
  'https://expressjs.com/, https://nodejs.org/'
),
(
  'PostgreSQL Best Practices for Web Applications',
  'Optimizing your database design and queries for performance',
  '<h2>Database Design Principles</h2><p>Good database design is crucial for application performance and maintainability. Here are some key principles to follow.</p><h3>Normalization</h3><p>Normalize your data to reduce redundancy and improve data integrity. However, don\'t over-normalize as it can impact query performance.</p><h3>Indexing Strategy</h3><ul><li>Index columns used in WHERE clauses</li><li>Index columns used in JOIN conditions</li><li>Consider composite indexes for multi-column queries</li><li>Monitor index usage and remove unused indexes</li></ul><h2>Query Optimization</h2><p>Use EXPLAIN ANALYZE to understand query performance:</p><pre><code>EXPLAIN ANALYZE SELECT * FROM posts WHERE tags LIKE \'%react%\';</code></pre><h3>Connection Pooling</h3><p>Use connection pooling to manage database connections efficiently. This reduces the overhead of creating new connections for each request.</p><h2>Security Considerations</h2><p>Always use parameterized queries to prevent SQL injection attacks. Never concatenate user input directly into SQL queries.</p>',
  'postgresql, database, sql, performance, security',
  'https://www.postgresql.org/, https://www.postgresql.org/docs/'
),
(
  'Deploying Full-Stack Applications',
  'From development to production with modern deployment platforms',
  '<h2>Deployment Strategy</h2><p>Modern deployment platforms have made it easier than ever to deploy full-stack applications. Here\'s how to approach deployment effectively.</p><h3>Platform Selection</h3><ul><li><strong>Frontend:</strong> Vercel, Netlify, or GitHub Pages</li><li><strong>Backend:</strong> Railway, Heroku, or DigitalOcean</li><li><strong>Database:</strong> Neon, Supabase, or AWS RDS</li></ul><h2>Environment Variables</h2><p>Use environment variables to manage configuration across different environments:</p><pre><code>DATABASE_URL=postgresql://user:pass@host/db\nNODE_ENV=production\nFRONTEND_URL=https://your-app.vercel.app</code></pre><h3>CI/CD Pipeline</h3><p>Set up continuous integration and deployment:</p><ul><li>Automated testing on every push</li><li>Automatic deployment to staging</li><li>Manual approval for production</li></ul><h2>Monitoring and Logging</h2><p>Implement proper monitoring and logging to track application performance and errors. Use tools like Sentry for error tracking and Vercel Analytics for performance monitoring.</p>',
  'deployment, devops, hosting, vercel, railway',
  'https://vercel.com/, https://railway.app/, https://neon.tech/'
); 