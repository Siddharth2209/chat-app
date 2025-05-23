# Deploying to Vercel

This guide provides step-by-step instructions for deploying the Chat App to Vercel.

## Method 1: Manual Deployment via Vercel Dashboard

1. **Push your code to a GitHub repository**
   ```bash
   git remote add origin https://github.com/yourusername/chat-app.git
   git push -u origin main
   ```

2. **Go to Vercel and create a new project**
   - Visit [https://vercel.com/new](https://vercel.com/new)
   - Sign in with your GitHub account
   - Import your GitHub repository

3. **Configure project settings**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next

4. **Add environment variables**
   - NEXT_PUBLIC_SUPABASE_URL: Your Supabase URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key

5. **Deploy the application**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be available at https://your-project-name.vercel.app

## Method 2: Automated Deployment with GitHub Actions

This repository includes a GitHub Actions workflow file (.github/workflows/deploy.yml) that automates the deployment process.

1. **Set up GitHub repository secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - VERCEL_TOKEN (from Vercel account settings)
     - VERCEL_ORG_ID (from Vercel project settings)
     - VERCEL_PROJECT_ID (from Vercel project settings)

2. **Push changes to the main branch**
   - The GitHub Actions workflow will automatically deploy your application to Vercel

## Updating Your Deployment

After making changes to your code:

1. Commit and push your changes to GitHub
   ```bash
   git add .
   git commit -m "Update application"
   git push
   ```

2. The application will be automatically deployed if you're using GitHub Actions, or you can manually deploy from the Vercel dashboard.
