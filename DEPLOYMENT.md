# Deployment Guide

## Backend Deployment (Railway)

### Step 1: Prepare Backend
1. Make sure your `backend/.env` has all required variables
2. Push your code to GitHub

### Step 2: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose the `backend` folder as the root directory
6. Add environment variables in Railway dashboard:
   ```
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
7. Railway will automatically deploy
8. Copy your Railway backend URL (e.g., `https://your-app.railway.app`)

### Step 3: Configure CORS
After deployment, update `FRONTEND_URL` in Railway with your actual Vercel frontend URL.

---

## Frontend Deployment (Vercel)

### Step 1: Update Frontend Environment
1. Update `frontend/.env`:
   ```
   VITE_API_URL=https://your-backend.railway.app
   VITE_CLOUDINARY_CLOUD_NAME=dxlh6mpda
   VITE_CLOUDINARY_UPLOAD_PRESET=zuno-chat
   ```

### Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend.railway.app
   VITE_CLOUDINARY_CLOUD_NAME=dxlh6mpda
   VITE_CLOUDINARY_UPLOAD_PRESET=zuno-chat
   ```
7. Click "Deploy"

### Step 3: Update Backend CORS
After frontend is deployed, go back to Railway and update the `FRONTEND_URL` environment variable with your Vercel URL.

---

## Post-Deployment Checklist

- [ ] Backend is running on Railway
- [ ] Frontend is deployed on Vercel
- [ ] Environment variables are set correctly on both platforms
- [ ] CORS is configured with correct frontend URL
- [ ] Socket.io connection works (test real-time messaging)
- [ ] Image uploads work (Cloudinary)
- [ ] MongoDB connection is stable

---

## Troubleshooting

### Socket.io not connecting
- Check that `VITE_API_URL` in frontend matches your Railway backend URL
- Verify CORS settings in backend include your Vercel URL
- Check Railway logs for connection errors

### Images not uploading
- Verify Cloudinary credentials in frontend environment variables
- Check browser console for upload errors

### Database connection issues
- Verify MongoDB connection string in Railway
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
- Review Railway logs for connection errors

---

## Useful Commands

### Local Development
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

### Check Logs
- **Railway**: Click on your service → "Deployments" → View logs
- **Vercel**: Go to your project → "Deployments" → Click deployment → View logs
