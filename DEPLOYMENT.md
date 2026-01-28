# FOURCi Deployment Guide

This guide covers deploying the FOURCi application to Vercel with both the React frontend and Node.js backend.

## Project Structure

```
├── Root (Vite React App)
│   ├── App.tsx, index.tsx, components/, pages/
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json (routing config)
│   └── .env.local (GEMINI_API_KEY)
│
├── backend/ (Express + MongoDB)
│   ├── server.js (MongoDB API)
│   ├── static_server.js (Fallback file-based API)
│   ├── smoke_test.js (Test suite)
│   ├── package.json
│   ├── routes/resources.js
│   ├── models/Resource.js
│   ├── data/resources.json (fallback data)
│   └── .env (MONGODB_URI, PORT)
│
└── api/ (Optional serverless API routes)
    ├── package.json
    ├── resources.js
    └── resources/[id].js
```

## Deployment Strategies

### Option 1: Vercel (Recommended for Full Stack)

#### Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Environment variables configured in Vercel dashboard

#### Environment Variables (Set in Vercel Dashboard)

**Frontend:**

```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Backend:**

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=FOURCi
PORT=5000
```

#### Deployment Steps

1. **Install dependencies:**

   ```bash
   npm install
   cd backend && npm install
   cd ../api && npm install
   ```

2. **Local testing:**

   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   cd backend && npm run dev

   # Terminal 3: Smoke tests
   cd backend && node smoke_test.js
   ```

3. **Build locally:**

   ```bash
   npm run build
   ```

4. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

5. **Vercel Auto-Deploy:**
   - Vercel automatically deploys on push to `master` branch
   - Monitor deployment at vercel.com dashboard

#### Vercel Configuration

The `vercel.json` file handles routing:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:

- `/api/*` routes go to serverless functions
- All other routes serve `index.html` (React Router SPA)

### Option 2: Fallback Static Deployment

If MongoDB connection fails, the app uses a file-based fallback:

```bash
cd backend
npm run start:static  # Runs static_server.js on port 5000
```

Features:

- ✅ All HTML pages served statically
- ✅ File-based JSON resource management
- ✅ GET, POST, DELETE API endpoints
- ✅ Full smoke test coverage

### Option 3: Docker Deployment

Create a `Dockerfile` in the root:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy everything
COPY package*.json ./
COPY backend/package*.json ./backend/
RUN npm install && cd backend && npm install

# Build React app
RUN npm run build

# Expose ports
EXPOSE 3000 5000

# Start backend (serves dist for static files)
WORKDIR /app/backend
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t fourci .
docker run -p 3000:3000 -p 5000:5000 -e MONGODB_URI=your_uri fourci
```

## Testing Before Deployment

### Local Testing Checklist

```bash
# 1. Install all dependencies
npm install && cd backend && npm install && cd ..

# 2. Set environment variables
# .env.local (frontend)
# backend/.env (backend)

# 3. Build the frontend
npm run build

# 4. Start static server (fallback test)
cd backend && npm run start:static &
cd .. && npm run dev

# 5. Run smoke tests
cd backend && node smoke_test.js

# 6. Manual testing
# Visit http://localhost:3000 (React frontend)
# Visit http://localhost:5000 (Static fallback)
# Check API endpoints:
#   GET /api/resources
#   POST /api/resources
#   DELETE /api/resources/:id
```

### Smoke Test Details

The smoke test (`backend/smoke_test.js`) validates:

- ✅ All HTML pages load (200 status)
- ✅ JS/CSS assets available
- ✅ GET /api/resources endpoint
- ✅ POST /api/resources (create)
- ✅ DELETE /api/resources/:id
- ✅ Data persistence after CRUD operations

Run with:

```bash
node backend/smoke_test.js
```

## Performance Optimization

### Current Issues

- ⚠️ React bundle: 605 KB (gzip: 152 KB)
- ⚠️ Warning: Consider code splitting for large chunks

### Recommendations

1. **Enable dynamic imports** for heavy components:

   ```tsx
   const ClimateAssistant = lazy(() => import("./components/ClimateAssistant"));
   ```

2. **Tree-shake unused dependencies** in `vite.config.ts`

3. **Compress images** before deployment

4. **Use CDN** for static assets (CSS, fonts)

## Monitoring & Logging

### Vercel Logs

```bash
vercel logs  # View deployment logs
vercel env   # Manage environment variables
```

### Backend Logging

Monitor MongoDB connection and API errors:

```bash
# Check backend logs
tail -f backend/server.js

# Test MongoDB connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.log('❌ Error:', e.message))"
```

## Troubleshooting

### Issue: API returns 404

**Solution:** Check `vercel.json` rewrites and `/api/` route configuration

### Issue: MongoDB connection fails

**Solution:**

- Verify `MONGODB_URI` in environment variables
- Check IP whitelist in MongoDB Atlas
- Fallback to static server with `npm run start:static`

### Issue: Large bundle size warning

**Solution:**

- Run `npm run build` and check `dist/` size
- Enable code splitting in `vite.config.ts`
- Remove unused dependencies

### Issue: Port conflicts

**Solution:** Change port in:

- Frontend: `vite.config.ts` (server.port)
- Backend: `backend/server.js` (PORT env var)
- Static: `backend/static_server.js` (const PORT)

## Security Checklist

- [ ] GEMINI_API_KEY stored only in `.env.local` (not in git)
- [ ] MONGODB_URI stored only in `.env` and Vercel secrets
- [ ] CORS enabled appropriately
- [ ] Database indexes created for performance
- [ ] Input validation on API endpoints
- [ ] Rate limiting implemented (if needed)

## Next Steps

1. **Deploy to staging:** Push to a staging branch first
2. **Monitor:** Set up error tracking (Sentry, LogRocket)
3. **Scale:** Use MongoDB Atlas Premium for production
4. **Optimize:** Implement caching and CDN
5. **Backup:** Enable MongoDB automated backups

---

For more details, see [README.md](README.md) and [README-STATIC.md](README-STATIC.md)
