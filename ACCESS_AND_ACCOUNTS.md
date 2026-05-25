# Senjr Access and Account Summary

Last checked: 2026-05-26 (Auth + Deploy Engineer heartbeat)

## Direct Website Link

Primary live link: https://senjr-ai-learning.vercel.app

## GitHub Repository

- Remote: https://github.com/Dev-HiteshAgrawal/senjr-ai-learning.git
- Branch: main
- Status: Connected and working

## Build Status

- Production build: **PASSING** (npm run build succeeds)
- TypeScript compilation: Clean
- Vite production bundle: Generated successfully

## .env.example Variables

The .env.example file contains all 6 required Firebase configuration variables:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## GitHub Actions Workflows

### CI Workflow (ci.yml)
- Runs on: push to main, pull requests
- Steps: Checkout, Node.js setup, install dependencies, lint, build
- **Secrets required: None** - runs without authentication

### Vercel Deploy Workflow (vercel-deploy.yml)
- Runs on: push to main
- Steps: Checkout, Node.js setup, install, build, deploy to Vercel
- **Secrets (OPTIONAL)**: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
  - Note: Vercel token is optional - Vercel automatically deploys from GitHub integration when connected
  - Current production deploys via Vercel GitHub integration, not via Actions

## Vercel Project

- Project: senjr-ai-learning
- Production URL: https://senjr-ai-learning.vercel.app
- Environment: Configured for automatic GitHub deployments

## Remaining Manual Items

1. **Firebase Auth Setup** (if not already configured):
   - Create Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password provider)
   - Add the 6 Firebase config values to Vercel environment variables

2. **GitHub Actions Vercel Token** (OPTIONAL):
   - Not required for current production deployment
   - Only needed if you want to control Vercel deploys via GitHub Actions instead of Vercel's automatic GitHub integration
   - Can be added later if needed

## Latest Commit

Commit `34827bc` pushed to `origin/main` on 2026-05-:
- Fixed React 19 lint error (useCallback for media ref handlers in LiveSession)
- Added `firestore.rules` + `firestore.indexes.json` for Firestore deployment
- Added `scripts/seed-admin.ts` and `src/services/adminSeed.ts` for admin bootstrapping
- Cleaned up `.gitignore` (removed duplicate `.env*.local` rule)
- Various UI/polish updates across all pages
- Verified: `npm run build` ✅, `npm run lint` ✅

## Current App State

- Landing page and all routes are functional
- Firebase wrapper code is present
- Auth.tsx calls Firebase auth functions
- ProtectedRoute guards authenticated routes
- Build passes cleanly from current repo state

## Verification Completed

- [x] .env.example has all 6 required Firebase vars
- [x] Production build is clean (npm run build passes)
- [x] Git remote is correct and connected
- [x] GitHub Actions CI workflow runs without secrets
- [x] Vercel deploy workflow treats token as optional (per task requirements)
- [x] ACCESS_AND_ACCOUNTS.md updated with accurate state