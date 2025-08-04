# Deployment Guide

This guide covers deploying the Moroz Art Gallery application to production.

## Prerequisites

- GitHub repository
- Vercel account (for frontend)
- Railway/Heroku account (for backend)
- Stripe account with live keys
- Firebase project configured for production

## Frontend Deployment (Vercel)

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory (not backend)

### 2. Configure Build Settings
- **Framework Preset**: Create React App
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 3. Environment Variables
Add these in Vercel dashboard:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app/api
```

### 4. Deploy
- Deploy automatically on push to main branch
- Custom domain can be configured in Vercel settings

## Backend Deployment (Railway)

### 1. Create New Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 2. Configure Service
- **Root Directory**: `backend`
- **Start Command**: `npm start`
- **Port**: Railway will auto-assign (use `process.env.PORT`)

### 3. Environment Variables
Add these in Railway dashboard:
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
APPLICATION_FEE_PERCENT=10
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
# Add Firebase Admin SDK variables
# Add email service variables if needed
```

### 4. Deploy
- Deploy automatically on push to main branch
- Railway will provide a public URL

## Alternative: Heroku Backend Deployment

### 1. Create Heroku App
```bash
heroku create your-app-name
```

### 2. Configure Buildpack
```bash
heroku buildpacks:set heroku/nodejs
```

### 3. Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app
# Add all other environment variables
```

### 4. Deploy
```bash
git subtree push --prefix backend heroku main
```

## Post-Deployment Setup

### 1. Stripe Webhooks
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-backend-url/api/webhooks/stripe`
3. Select events to listen for
4. Copy webhook secret to environment variables

### 2. Firebase Security Rules
Update Firestore and Storage rules for production:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Add your production security rules
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Add your production security rules
  }
}
```

### 3. Domain Configuration
- Configure custom domain in Vercel
- Update CORS settings in backend for new domain
- Update Firebase authorized domains

### 4. SSL/HTTPS
- Vercel provides SSL automatically
- Railway/Heroku provide SSL automatically
- Ensure all API calls use HTTPS

## Monitoring and Maintenance

### 1. Error Tracking
- Monitor Vercel deployment logs
- Monitor Railway/Heroku application logs
- Set up error tracking (Sentry, LogRocket, etc.)

### 2. Performance Monitoring
- Use Vercel Analytics
- Monitor API response times
- Set up uptime monitoring

### 3. Backup Strategy
- Firebase automatic backups
- Regular database exports
- Code repository backups

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check FRONTEND_URL in backend environment
2. **Stripe Webhooks**: Verify webhook URL and secret
3. **Firebase Permissions**: Check security rules
4. **Environment Variables**: Ensure all required vars are set

### Logs
- **Vercel**: Check deployment and function logs
- **Railway**: Check application logs in dashboard
- **Heroku**: Use `heroku logs --tail`

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] No sensitive data in repository
- [ ] Firebase security rules are production-ready
- [ ] Stripe webhooks are configured
- [ ] HTTPS is enforced everywhere
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Error messages don't expose sensitive information