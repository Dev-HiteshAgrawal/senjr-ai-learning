# Senjr Deployment Checklist

> **Status**: Vercel DEPLOYED. Firebase Auth pending. GitHub repo push pending.
> **Last updated**: 2026-05-19
> **Billing**: Zero-budget — Firebase Spark (free) + Vercel Hobby (free) only.

---

## Completed

- [x] `.gitignore` configured — `.env` and secrets excluded
- [x] `.env.example` with all Firebase config keys
- [x] `vercel.json` for SPA routing + asset caching
- [x] GitHub Actions CI workflow (lint + build)
- [x] GitHub Actions Vercel deploy workflow
- [x] Build verified: `npm run build` passes
- [x] Git repo initialized, 4 commits on `main` branch
- [x] Firebase Auth code: email/password + Google sign-in ready
- [x] AuthContext + useAuth hooks wired into App.tsx
- [x] **Vercel deployed** — production live

### Live URL

**https://senjr-ai-learning.vercel.app**

Deployment ID: `dpl_FvQT8r7FoVdTNptE4NdwSQ7cx6Zn`
Vercel project: `zentropques-projects/senjr-ai-learning`

---

## Blocked — Requires YOUR Account Actions

### 1. Create GitHub Repository (5 min)

The app is a local git repo with 4 commits but has no remote yet.

```bash
# Option A: GitHub CLI (if installed)
gh repo create senjr-ai-learning --public --source=. --remote=origin --push

# Option B: Manual (always works)
# 1. Go to https://github.com/new
# 2. Repo name: senjr-ai-learning
# 3. Public (free)
# 4. Do NOT initialize with README/.gitignore
# 5. Create, then run:
git remote add origin https://github.com/YOUR_USERNAME/senjr-ai-learning.git
git push -u origin main
```

### 2. Create Firebase Project (10 min)

Without Firebase config, the app shows "Firebase Setup Required" on load.

1. Go to https://console.firebase.google.com/
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
10. Copy the config values into Vercel env vars:

### 3. Add Firebase Env Vars to Vercel (3 min)

After creating the Firebase project, add these 6 env vars to your Vercel project:

1. Go to https://vercel.com/zentropques-projects/senjr-ai-learning/settings/environment-variables
2. Add each variable (copy from Firebase web app config):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN` — format: `your-project.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET` — format: `your-project.appspot.com`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Redeploy — a new deployment will auto-trigger

### 4. (Optional) GitHub Actions Auto-Deploy

If you want pushes to `main` to auto-deploy to Vercel via CI:

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

1. Visit https://senjr-ai-learning.vercel.app → should show Senjr landing page (not "Firebase Setup Required")
2. Click "Sign up" → create account with email/password → should see dashboard
3. Click "Continue with Google" → should redirect to Google OAuth → return to app
4. Sign out → should return to auth screen
5. Check Firebase Console → Authentication → Users → your test user should appear
