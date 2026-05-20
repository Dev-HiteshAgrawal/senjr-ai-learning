# Senjr Deployment Checklist

> **Status**: Build passes. Auth code wired. Firebase project + Vercel env vars + GitHub remote still need account actions.
> **Last updated**: 2026-05-20
> **Billing**: Zero-budget — Firebase Spark (free) + Vercel Hobby (free) only.

---

## Completed (Local)

- [x] `.gitignore` configured — `.env` and secrets excluded
- [x] `.env.example` with all Firebase config keys
- [x] `vercel.json` for SPA routing + asset caching
- [x] GitHub Actions CI workflow (lint + build)
- [x] GitHub Actions Vercel deploy workflow
- [x] Build verified: `npm run build` passes (tsc + vite)
- [x] Git repo initialized, commits on `main` branch
- [x] Firebase Auth code: email/password + Google sign-in ready
- [x] AuthContext + useAuth hooks wired into App.tsx
- [x] Auth.tsx calls real Firebase signInWithEmailAndPassword/createUserWithEmailAndPassword
- [x] ProtectedRoute component guards all authenticated routes with role-based access
- [x] Firestore (db) export added to firebase/config.ts for user profile storage
- [x] Vercel deployed — production live at https://senjr-ai-learning.vercel.app

---

## BOARD ACTION REQUIRED — Blocked (Requires YOUR Account Actions)

### 1. Create Firebase Project (10 min)

**Owner**: You (baatchetindia@gmail.com is logged into Firebase CLI locally)
**Why blocked**: No Firebase project exists. Without it, auth is inactive in production.

1. Go to https://console.firebase.google.com/ (logged in as baatchetindia@gmail.com)
2. Click **Add project** → name it `senjr-ai-learning`
3. **Disable** Google Analytics (not needed, saves quota)
4. Wait for project creation → stay on **Spark (free)** tier
5. Go to **Authentication** → **Get started**
6. Enable sign-in methods:
   - **Email/Password** → Enable → Save
   - **Google** → Enable → set support email → Save
7. Go to **Project settings** (gear icon) → **General** tab
8. Scroll to **Your apps** → click **Web** (`</>`) icon
9. Register app name: `senjr-ai-learning`
10. Copy the 6 config values — you will need them for step 3

### 2. Add Firebase Env Vars to Vercel (3 min)

**Owner**: You (ashisbhakta890@gmail.com owns the Vercel project)
**Why blocked**: Vercel env vars are empty. App loads but auth does nothing.

1. Go to https://vercel.com/zentropques-projects/senjr-ai-learning/settings/environment-variables
2. Add these 6 variables (copy from Firebase web app config in step 1):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN` — format: `your-project.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET` — format: `your-project.appspot.com`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Redeploy — a new deployment will auto-trigger

### 3. Create GitHub Repository and Push (5 min)

**Owner**: You (hitesh.agrawal.dev@gmail.com is the local Git identity)
**Why blocked**: No GitHub remote is connected. Source code is only local.

```bash
# Option A: Manual (always works)
# 1. Go to https://github.com/new
# 2. Repo name: senjr-ai-learning
# 3. Public (free)
# 4. Do NOT initialize with README/.gitignore
# 5. Create, then run:
git remote add origin https://github.com/YOUR_USERNAME/senjr-ai-learning.git
git push -u origin main

# Option B: GitHub CLI (if you install it)
gh repo create senjr-ai-learning --public --source=. --remote=origin --push
```

### 4. (Optional) GitHub Actions Auto-Deploy Secrets (3 min)

**Owner**: You
**Why blocked**: Needs Vercel token + GitHub repo secrets.

1. Generate token: Vercel Dashboard → Settings → **Tokens** → Create
2. Add GitHub repo secrets:
   - `VERCEL_TOKEN` → your token
   - `VERCEL_ORG_ID` → `team_nzH8YsnWhN6s0QF6Qo3rVUjq`
   - `VERCEL_PROJECT_ID` → `prj_gCBYbIQgu8247JmjZsLAzlQHaAmV`

---

## Security Reminders

- **NEVER** commit `.env` to Git (already in `.gitignore`)
- Firebase config keys are **client-safe** (they're meant for browser use)
- Vercel env vars are encrypted at rest
- Google sign-in requires your deployed domain to be an **authorized redirect URI** in Firebase Console

---

## Post-Deploy Verification

After adding Firebase env vars and redeploying, test these flows:

1. Visit https://senjr-ai-learning.vercel.app - should show the Senjr landing page
2. Click "Sign up" → create account with email/password → should see dashboard
3. Click "Continue with Google" → should redirect to Google OAuth → return to app
4. Sign out → should return to auth screen
5. Check Firebase Console → Authentication → Users → your test user should appear
