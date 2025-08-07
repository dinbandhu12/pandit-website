# Blog Website

A minimal blog website with React frontend and Node.js backend, featuring public viewing and admin panel for CRUD operations.

## Features

### Public Features
- View all blog posts in a responsive list
- Read individual blog posts with rich content
- Search and filter posts by tags
- Clean, minimal design with Tailwind CSS

### Admin Features
- Access via `/blog-posts-admin` route
- Simple password protection (username: admin, password: admin)
- Add new blog posts with rich text editor
- Edit existing posts
- Delete posts with confirmation
- Preview functionality

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Neon)
- **Hosting:** Vercel (frontend) + Railway (backend)

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Backend (create `backend/.env`):
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   Frontend (create `frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## Database Setup

The application automatically creates the required table on startup. The schema is:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  content TEXT NOT NULL,
  tags TEXT,
  links TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

- `GET /api/posts` - Get all posts (public)
- `GET /api/posts/:id` - Get single post (public)
- `POST /api/posts` - Create new post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)
- `GET /api/health` - Health check

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variable:
   - `VITE_API_URL`: Your Railway backend URL
4. Deploy

### Backend (Railway)

1. Push your code to GitHub
2. Connect your repository to Railway
3. Set environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL
4. Deploy

### Database (Neon)

1. Create a Neon account and database
2. Get your connection string
3. Use it in your Railway environment variables

## Project Structure

```
blog/
├── backend/                 # Node.js Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── railway.json        # Railway deployment config
├── frontend/               # React Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vercel.json        # Vercel deployment config
└── package.json            # Root package.json
```

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run server` - Start only the backend
- `npm run client` - Start only the frontend
- `npm run build` - Build the frontend for production

### Adding New Features

1. **Backend**: Add new routes in `backend/server.js`
2. **Frontend**: Create new components in `frontend/src/components/`
3. **Pages**: Add new pages in `frontend/src/pages/`
4. **Routing**: Update routes in `frontend/src/App.jsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 