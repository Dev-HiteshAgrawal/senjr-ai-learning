# User Actions Required — Account & Secrets Checklist

Some steps cannot be automated. They require you to log into third-party services and provide credentials/secrets. Complete these in order.

---

## 1. GitHub — Push Code to Remote

**Why**: The local repo is initialized with commits, but hasn't been pushed to GitHub yet.
**What to do**:
```bash
# Push existing commits to GitHub
git push -u origin main
```
You'll be prompted for your GitHub username and password (use a **personal access token** as password — Settings → Developer settings → Personal access tokens → Tokens (classic)). Get your token at https://github.com/settings/tokens

**Verified**: Git remote is set to `https://github.com/Dev-HiteshAgrawal/senjr-ai-learning.git` ✓

---

## 2. Firebase CLI — Log In (Optional, for Firestore Rules)

**Why**: To deploy Firestore security rules and indexes from local files.
**What to do**:
```bash
firebase login
```
This opens a browser window. Log into the Google account that owns the Firebase project. Then:
```bash
firebase deploy --only firestore
```
**Not required** if rules/indexes are already deployed via Firebase Console.

**Project**: `senjr-ai-learning` (already created) ✓
**Auth providers enabled**: Email/Password ✓

---

## 3. AI Tutor — Get a Free API Key

**Why**: The AI Tutor chat endpoint (`/api/aiTutor`) needs an API key from Groq or OpenAI.
**What to do** (choose one):

| Service | Sign Up | Cost | Key Format |
|---------|---------|------|------------|
| **Groq** (recommended) | https://console.groq.com | Free, no credit card | `gsk_...` |
| **OpenAI** | https://platform.openai.com | Free credits included | `sk-...` |

After getting the key:
- **Local dev**: Add to `.env.local` as `GROQ_API_KEY=gsk_your_key`
- **Vercel**: Add as environment variable in Project → Settings → Environment Variables

---

## 4. Google Sign-In — Authorize Redirect URIs

**Why**: Google OAuth requires adding your deployed domain to allowed redirect URIs in Firebase Console.
**What to do**:
1. Go to [Firebase Console](https://console.firebase.google.com/project/senjr-ai-learning/authentication/providers)
2. Click Google sign-in provider → "Authorized domains"
3. Add `senjr-ai-learning.vercel.app` (or your custom domain)
4. Also add the Web SDK configuration's authorized redirect URI if needed

---

## 5. GitHub Actions Vercel Deploy (Optional)

**Why**: The `.github/workflows/vercel-deploy.yml` workflow can auto-deploy via Actions. Not required — Vercel's native GitHub integration already auto-deploys on push.
**If you want it anyway**: Add these GitHub repo secrets:
- `VERCEL_TOKEN` — from Vercel Dashboard → Settings → Tokens
- `VERCEL_ORG_ID` — from Vercel project settings (also in `.vercel/project.json`)
- `VERCEL_PROJECT_ID` — from Vercel project settings (also in `.vercel/project.json`)

---

## Summary

| # | Action | Required? | Time |
|---|--------|-----------|------|
| 1 | `git push` (GitHub auth) | **Required** to publish code | 5 min |
| 2 | `firebase login` + deploy | Optional (or use Console) | 5 min |
| 3 | Get Groq/OpenAI API key | Required for AI Tutor | 2 min |
| 4 | Add Google redirect URIs | Required for Google Sign-In | 2 min |
| 5 | GitHub secrets for Vercel | Optional (Vercel auto-deploys) | 5 min |
