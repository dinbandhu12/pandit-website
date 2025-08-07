# Deployment Guide

This guide will walk you through deploying the blog website to production using Vercel (frontend), Railway (backend), and Neon (database).

## Prerequisites

1. **GitHub Account** - For hosting your code
2. **Vercel Account** - For frontend hosting
3. **Railway Account** - For backend hosting
4. **Neon Account** - For PostgreSQL database

## Step 1: Database Setup (Neon)

1. **Create Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up for a free account
   - Create a new project

2. **Get Database Connection String**
   - In your Neon dashboard, go to your project
   - Click on "Connection Details"
   - Copy the connection string (it looks like: `postgresql://user:password@host/database`)

## Step 2: Backend Deployment (Railway)

1. **Connect to GitHub**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your blog repository

2. **Configure Deployment**
   - Railway will automatically detect it's a Node.js project
   - Set the root directory to `backend`
   - Railway will use the `railway.json` configuration

3. **Set Environment Variables**
   - In your Railway project dashboard, go to "Variables"
   - Add the following variables:
     ```
     DATABASE_URL=your_neon_connection_string
     NODE_ENV=production
     FRONTEND_URL=https://your-vercel-app.vercel.app
     PORT=3001
     ```

4. **Deploy**
   - Railway will automatically deploy when you push to GitHub
   - Wait for deployment to complete
   - Note your Railway app URL (e.g., `https://your-app.railway.app`)

## Step 3: Frontend Deployment (Vercel)

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your blog repository

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-railway-app.railway.app
     ```

4. **Deploy**
   - Vercel will automatically deploy
   - Your app will be available at `https://your-app.vercel.app`

## Step 4: Update Environment Variables

After both deployments are complete:

1. **Update Railway Environment**
   - Go back to Railway dashboard
   - Update `FRONTEND_URL` with your Vercel URL

2. **Update Vercel Environment**
   - Go back to Vercel dashboard
   - Update `VITE_API_URL` with your Railway URL

## Step 5: Test Your Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Try viewing the blog posts
   - Test the search and filter functionality

2. **Test Admin Panel**
   - Go to `/blog-posts-admin`
   - Login with `admin` / `admin`
   - Try creating, editing, and deleting posts

3. **Test API**
   - Visit `https://your-railway-app.railway.app/api/health`
   - Should return `{"status":"OK","timestamp":"..."}`

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` in Railway matches your Vercel URL exactly
   - Check that the URL includes `https://`

2. **Database Connection Issues**
   - Verify your Neon connection string is correct
   - Check that your Neon database is active
   - Ensure the database user has proper permissions

3. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify the build commands are correct
   - Check the deployment logs for specific errors

4. **Environment Variables**
   - Double-check all environment variable names
   - Ensure no extra spaces or quotes
   - Redeploy after changing environment variables

### Debugging

1. **Railway Logs**
   - Go to Railway dashboard → your project → "Deployments"
   - Click on the latest deployment to view logs

2. **Vercel Logs**
   - Go to Vercel dashboard → your project → "Deployments"
   - Click on the latest deployment to view logs

3. **Database Logs**
   - In Neon dashboard, go to "Logs" to see database activity

## Performance Optimization

1. **Enable Caching**
   - Vercel automatically caches static assets
   - Consider adding cache headers for API responses

2. **Database Optimization**
   - Add indexes to frequently queried columns
   - Monitor query performance in Neon dashboard

3. **Image Optimization**
   - Use WebP format for images
   - Implement lazy loading for images

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use different database credentials for production

2. **API Security**
   - Consider implementing proper authentication
   - Add rate limiting for production
   - Use HTTPS for all communications

3. **Database Security**
   - Use strong passwords for database
   - Restrict database access to necessary IPs only

## Monitoring

1. **Vercel Analytics**
   - Enable Vercel Analytics for performance monitoring
   - Monitor page load times and user behavior

2. **Railway Monitoring**
   - Monitor API response times
   - Set up alerts for downtime

3. **Database Monitoring**
   - Monitor database performance in Neon dashboard
   - Set up alerts for connection issues

## Cost Optimization

1. **Neon Database**
   - Free tier includes 0.5GB storage
   - Monitor usage to stay within limits

2. **Railway**
   - Free tier includes limited usage
   - Monitor usage in dashboard

3. **Vercel**
   - Generous free tier for personal projects
   - Monitor bandwidth usage

## Backup Strategy

1. **Database Backups**
   - Neon provides automatic backups
   - Consider manual exports for important data

2. **Code Backups**
   - Use GitHub for version control
   - Consider multiple deployment environments

## Next Steps

1. **Custom Domain**
   - Add custom domain in Vercel settings
   - Update environment variables accordingly

2. **SSL Certificate**
   - Vercel and Railway provide automatic SSL
   - Ensure HTTPS is enforced

3. **Content Management**
   - Consider adding image upload functionality
   - Implement user authentication for admin panel

4. **Analytics**
   - Add Google Analytics or similar
   - Monitor user engagement

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Railway Documentation**: https://docs.railway.app
- **Neon Documentation**: https://neon.tech/docs
- **GitHub Issues**: For code-related problems 