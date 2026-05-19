# Senjr - AI Learning Platform

A zero-budget AI learning platform for students, mentors, and exam aspirants. Built with React, TypeScript, Vite, and Firebase.

## Tech Stack (Free Tier Only)

- **Frontend**: React 19 + TypeScript + Vite
- **Auth**: Firebase Authentication (Spark - Free Tier)
- **Deployment**: Vercel (Hobby - Free Tier)
- **CI/CD**: GitHub Actions

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Firebase Setup (Free/Spark Tier)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (no billing required - stays on Spark free tier)
3. Enable Authentication:
   - Email/Password sign-in method
   - Google sign-in method (requires domain verification)
4. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

5. Fill in your Firebase config values:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN` - format: `your-project.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET` - format: `your-project.appspot.com`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

**Important**: Never commit `.env` to GitHub. The `.gitignore` already excludes it.

## Vercel Deployment (Free/Hobby Tier)

### Option 1: Manual Deploy

1. Go to [Vercel](https://vercel.com) and sign up (free)
2. Import your GitHub repository
3. Add the environment variables in Vercel dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Deploy (uses Hobby free tier - no credit card required)

### Option 2: GitHub Actions Auto-Deploy

1. Generate Vercel token: Vercel Dashboard → Settings → Tokens
2. Add secrets to GitHub repo:
   - `VERCEL_TOKEN` - your Vercel access token
   - `VERCEL_ORG_ID` - found in Vercel project settings
   - `VERCEL_PROJECT_ID` - found in Vercel project settings
3. Push to main branch - deployment triggers automatically

## Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for the complete step-by-step guide including:
- GitHub repository creation
- Firebase project setup (Spark free tier)
- Vercel deployment (Hobby free tier)
- Post-deploy verification steps

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Initialize and push:

```bash
git init
git add .
git commit -m "Initial commit: Senjr AI learning platform"
git branch -M main
git remote add origin https://github.com/yourusername/senjr.git
git push -u origin main
```

3. The CI workflow (`.github/workflows/ci.yml`) runs on every push:
   - Installs dependencies
   - Runs linter
   - Builds the project
   - Uploads build artifact

## Auth Architecture

- **Student signup/login**: Email/password or Google
- **Mentor signup/login**: Email/password or Google
- **Role separation**: Stored in Firebase user displayName as JSON
- **Protected dashboards**: Main UI shown after authentication
- **Mentor verification**: Quality gate with 5 checkpoint fields

## Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Zero-Budget Operating Rules

- No paid Firebase features (stay on Spark tier)
- No paid Vercel features (stay on Hobby tier)
- OpenCode free models per task, such as Qwen, DeepSeek, or Nemotron when available
- Self-host LiveKit path for live rooms (future)
- Manual outreach before paid ads

## Project Structure

```
senjr-ai-learning/
├── src/
│   ├── firebase/config.ts    # Firebase initialization
│   ├── contexts/AuthContext.tsx  # Auth state management
│   ├── hooks/useAuth.ts      # Auth actions (login/signup)
│   ├── App.tsx               # Main application
│   └── main.tsx              # Entry point
├── .github/workflows/         # CI/CD pipelines
├── .env.example              # Environment template
└── package.json
```
