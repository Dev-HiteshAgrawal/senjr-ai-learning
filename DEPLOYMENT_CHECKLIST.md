# Senjr Deployment Checklist

> **Status**: All account blockers cleared. Build passes. Firebase Auth/Signup tested. Production live.
> **Last updated**: 2026-05-22
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
- [x] Firestore schema types defined in src/types/firestore.ts (users, students, mentors, sessions, documents, chats, reviews, notifications, resources, slots)
- [x] Role routing utility created in src/lib/role-routing.ts (getDashboardRoute, getPostAuthRoute, isRouteAccessible, getOnboardingRoute)
- [x] Student onboarding now persists data to Firestore progressively (instead of sessionStorage)
- [x] All onboarding pages wrapped in ProtectedRoute with role-based guards
- [x] Vercel deployed — production live at https://senjr-ai-learning.vercel.app

---

## COMPLETED BY BOARD ✅

- [x] Firebase Project `senjr-ai-learning` created under baatchetindia@gmail.com
- [x] Web app registered, config values copied to Vercel env vars
- [x] Vercel production redeployed with Firebase config
- [x] GitHub repo created and pushed: https://github.com/Dev-HiteshAgrawal/senjr-ai-learning

---

## ✅ Account Setup Complete

All deployment blockers have been resolved:

- [x] Firebase Project `senjr-ai-learning` created
- [x] Auth providers enabled (Email/Password)
- [x] Vercel env vars configured with real Firebase config values
- [x] Production deploy clean: https://senjr-ai-learning.vercel.app
- [x] Firebase Auth signup/login tested and working
- [x] Auth.tsx routes users to role-based dashboards on login/signup
- [x] Firestore `users/{uid}` document created on signup with role field

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
