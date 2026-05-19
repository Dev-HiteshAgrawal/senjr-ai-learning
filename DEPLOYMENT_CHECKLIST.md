# Senjr Deployment Checklist

> **Status**: Ready for user account actions. All local preparation is complete.
> **Last updated**: 2026-05-19
> **Billing**: Zero-budget — Firebase Spark (free) + Vercel Hobby (free) only.

---

## Completed (Local)

- [x] `.gitignore` configured — `.env` and secrets excluded
- [x] `.env.example` with all Firebase config keys
- [x] `vercel.json` for SPA routing + asset caching
- [x] GitHub Actions CI workflow (lint + build)
- [x] GitHub Actions Vercel deploy workflow
- [x] Build verified: `npm run build` passes (545 kB JS, 17 kB CSS)
- [x] Git repo initialized, initial commit on `main` branch
- [x] Firebase Auth code: email/password + Google sign-in ready
- [x] AuthContext + useAuth hooks wired into App.tsx

---

## Blocked — Requires YOUR Account Actions

### 1. Create GitHub Repository (5 min)

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
10. Copy the config values into `.env`:

```bash
cp .env.example .env
# Edit .env with your real Firebase values
```

### 3. Deploy to Vercel (5 min)

**Option A: Vercel Dashboard (easiest, no CLI needed)**

1. Go to https://vercel.com → Sign up with GitHub (free Hobby tier)
2. Click **Add New** → **Project**
3. Import your `senjr-ai-learning` GitHub repo
4. Framework preset: **Vite** (auto-detected)
5. Add environment variables (copy from `.env`):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
6. Click **Deploy** → wait ~60 seconds
7. Your app is live at `https://senjr-ai-learning.vercel.app`

**Option B: Vercel CLI**

```bash
npm i -g vercel
vercel login          # browser login
vercel                # first deploy (interactive)
vercel --prod         # production deploy
```

### 4. (Optional) GitHub Actions Auto-Deploy

If you want pushes to `main` to auto-deploy to Vercel:

1. Generate token: Vercel Dashboard → Settings → **Tokens** → Create
2. Add GitHub repo secrets:
   - `VERCEL_TOKEN` → your token
   - `VERCEL_ORG_ID` → from Vercel project settings
   - `VERCEL_PROJECT_ID` → from Vercel project settings

---

## Security Reminders

- **NEVER** commit `.env` to Git (already in `.gitignore`)
- Firebase config keys are **client-safe** (they're meant for browser use)
- Vercel env vars are encrypted at rest
- Google sign-in requires your deployed domain to be an **authorized redirect URI** in Firebase Console

---

## Post-Deploy Verification

After deployment, test these flows:

1. Visit your Vercel URL → should show Senjr landing page
2. Click "Sign up" → create account with email/password → should see dashboard
3. Click "Continue with Google" → should redirect to Google OAuth → return to app
4. Sign out → should return to auth screen
5. Check Firebase Console → Authentication → Users → your test user should appear
