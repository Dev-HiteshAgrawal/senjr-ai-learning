# Senjr Access and Account Summary

Last checked: 2026-05-20, India time.

## Direct Website Link

Primary live link:

https://senjr-ai-learning.vercel.app

Current Vercel aliases:

- https://senjr-ai-learning.vercel.app
- https://senjr-ai-learning-zentropques-projects.vercel.app
- https://senjr-ai-learning-zentropque-zentropques-projects.vercel.app

## Vercel Account

The local Vercel CLI is logged in as:

- Email: ashisbhakta890@gmail.com
- Username: zentropque
- Team/project space: zentropques-projects
- Team/org id: team_nzH8YsnWhN6s0QF6Qo3rVUjq
- Project name: senjr-ai-learning
- Project id: prj_gCBYbIQgu8247JmjZsLAzlQHaAmV

Vercel project dashboard:

https://vercel.com/zentropques-projects/senjr-ai-learning

Environment variables status:

- **No environment variables are currently set on Vercel for this project.**
- Because of this, Firebase login/signup cannot work in production yet.
- **Action needed**: Add 6 Firebase config vars (see DEPLOYMENT_CHECKLIST.md step 2).

## Firebase Account

The local Firebase CLI is logged in as:

- Email: baatchetindia@gmail.com

Firebase project status:

- **No Firebase projects were found on this logged-in account.**
- The app has Firebase code prepared (Auth.tsx calls real Firebase functions), but no actual Firebase project/config is connected yet.
- **Action needed**: Create project at https://console.firebase.google.com/ (see DEPLOYMENT_CHECKLIST.md step 1).

Firebase console:

https://console.firebase.google.com/

Required Firebase setup:

- Create project: senjr-ai-learning
- Keep it on Spark/free plan.
- Enable Authentication (Email/Password + Google).
- Add the six Vite Firebase config values into Vercel environment variables.

Required Vercel environment variable names:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

## GitHub Account / Repo

Current local Git status:

- Branch: main
- Working tree: has unstaged changes (modified source files + untracked docs)
- **No GitHub remote is connected.**
- GitHub CLI is not installed/available on this laptop.

Local Git identity in this repo:

- user.name: Senjr Auth Deploy
- user.email: senjr-ai@users.noreply.github.com

Global Git identity on this laptop:

- user.name: Dev-HiteshAgrawal
- user.email: hitesh.agrawal.dev@gmail.com

**Action needed**: Create a GitHub repo manually or install/sign in to GitHub CLI, then push.

## Current App Reality

The deployed site is live, but Firebase auth is not connected yet.

Current state:

- Landing pages and UI routes exist.
- Firebase wrapper code exists and exports auth + db.
- Auth.tsx calls real Firebase signInWithEmailAndPassword / createUserWithEmailAndPassword.
- ProtectedRoute guards all authenticated routes with role-based access.
- Login/signup UI calls real Firebase auth functions (when configured).
- Vercel has no Firebase environment variables, so real Firebase auth is inactive in production.
- AI tutor page is currently mock/static content.
- Booking/payment is currently mock UI.
- Live session page uses browser camera/mic locally, not a real meeting room server.
- Mentor verification/document upload has no real fraud verification or storage workflow yet.
- GitHub remote is not connected.
- Build passes: `npm run build` succeeds (tsc + vite).

## Recommended Immediate Order

1. Create/connect Firebase project and add Vercel env vars. (BLOCKED — needs your action)
2. Connect GitHub remote and push source code. (BLOCKED — needs your action)
3. Add database/storage rules for users, mentor profiles, documents, sessions, resources, tests, and payments.
4. Add real AI tutor backend route with rate limits and free/low-cost provider selection.
5. Add booking workflow and meeting-room access rules.
6. Add verification workflow for mentor documents and portfolio evidence.
