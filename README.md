# Senjr - AI Learning Platform

An AI learning platform for students, mentors, and exam aspirants. Built with React, TypeScript, Vite, and Firebase.

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

**Current status**: Production live at https://senjr-ai-learning.vercel.app

### Re-deploy on push
Vercel auto-deploys from GitHub when the repo is linked. Just push to `main`.

### Manual Re-deploy (Vercel CLI)
```bash
vercel --prod
```

### Environment Variables (Vercel Dashboard)
Add these in Project → Settings → Environment Variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `GROQ_API_KEY` (optional — for AI Tutor)

### GitHub Actions Workflow (Optional)
`.github/workflows/vercel-deploy.yml` can deploy via Actions if `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets are set. Not required — Vercel's GitHub integration handles this automatically.

## AI Tutor API Keys (Free)

The AI Tutor endpoint (`/api/aiTutor`) requires either a Groq or OpenAI API key:

- **Groq (recommended)**: Sign up free at https://console.groq.com — get a key instantly, no credit card
- **OpenAI**: Sign up at https://platform.openai.com — free credits included

Set the key in your environment:
- Local dev: add to `.env.local` as `GROQ_API_KEY=gsk_...` or `OPENAI_API_KEY=sk-...`
- Vercel: add as environment variable in Vercel dashboard

## Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for the complete step-by-step guide.

## Auth Architecture

- **Student signup/login**: Email/password or Google
- **Mentor signup/login**: Email/password or Google
- **Role separation**: Stored in Firestore `users/{uid}.role` field
- **Protected dashboards**: `ProtectedRoute` component guards by auth + role
- **Mentor verification**: Admin reviews identity docs before granting mentor access

## Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## CI/CD

The CI workflow (`.github/workflows/ci.yml`) runs on every push/PR:
- Installs dependencies
- Runs linter
- Builds the project
- Uploads build artifact

## Project Structure

```
senjr-ai-learning/
├── src/
│   ├── firebase/config.ts       # Firebase initialization
│   ├── contexts/AuthContext.tsx  # Auth state management
│   ├── hooks/useAuth.ts         # Auth actions (login/signup)
│   ├── components/              # Reusable components (ProtectedRoute)
│   ├── pages/                   # Route pages (20+ pages)
│   ├── services/                # Firestore CRUD, verification, sessions
│   └── types/firestore.ts       # Firestore schema types
├── api/
│   └── aiTutor.ts               # Vercel serverless AI Tutor function
├── scripts/
│   └── seed-admin.ts            # Admin user seeding utility
├── .github/workflows/           # CI/CD pipelines
├── firestore.rules              # Firestore security rules
├── firestore.indexes.json       # Firestore composite indexes
├── .env.example                 # Environment template
└── package.json
```
