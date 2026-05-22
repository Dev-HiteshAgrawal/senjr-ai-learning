# Senjr MVP Technical Execution Plan

**Created**: 2026-05-20  
**Owner**: CTO  
**Timeline**: Next 24 hours priority

---

## Current State Assessment (Updated 2026-05-20)

| Component | Status | Action Required |
|-----------|--------|------------------|
| Vercel Deployment | ✅ Live | None |
| Firebase Project | ✅ Created | Account setup complete |
| Firebase Env Vars | ✅ Configured | Vercel env vars set |
| Auth (Firebase) | ✅ Implemented | Code complete |
| Firestore/Storage | ✅ Configured | Code complete |
| Firestore Schema Types | ✅ Created | src/types/firestore.ts |
| Role Routing Utility | ✅ Created | src/lib/role-routing.ts |
| Student Onboarding Persistence | ✅ Fixed | Now saves to Firestore progressively |
| ProtectedRoute on Onboarding | ✅ Added | All onboarding pages wrapped |
| GitHub Remote | ✅ Connected | https://github.com/Dev-HiteshAgrawal/senjr-ai-learning |
| AI Tutor | ✅ Implemented | Code complete (needs GROQ_API_KEY) |
| Booking/Payment | ✅ Implemented | Code complete |
| Mentor Verification | ✅ Implemented | Code complete |
| Protected Routes | ✅ Fixed | Code complete |

---

## Phase 1 Execution (Next 24 Hours)

### ✅ Account Blockers Resolved (2026-05-22)

All prior blockers have been resolved by the board:
- Firebase Project `senjr-ai-learning` created
- Auth providers (Email/Password) enabled
- Vercel env vars configured with real Firebase config values
- Production deploy clean at https://senjr-ai-learning.vercel.app
- Firebase Auth signup/login tested end-to-end

---

### CODE WORK (Can Start Now)

#### Task 1: Fix Auth Page to Use Real Firebase ✅ DONE
- **Owner**: CTO (completed)
- **File**: src/pages/Auth.tsx
- **Changes**:
  - Import firebase auth functions (signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile)
  - Import Firestore functions (doc, setDoc, getDoc)
  - Replace mock navigation with real Firebase auth
  - Add error handling for all Firebase auth error codes
  - Save user to Firestore users collection on signup with role
  - Add Firebase configuration warning banner
  - Add loading state to button during auth
- **Status**: Complete, TypeScript compiles without errors

#### Task 2: Add Protected Routes
- **Owner**: Frontend Engineer  
- **Files**: src/App.tsx, src/contexts/AuthContext.tsx
- **Changes**:
  - Add role-based route guards
  - Roles: student, mentor, pending_mentor, admin
  - Redirect to /auth if not logged in

#### Task 3: Add Firestore Data Model
- **Owner**: Auth Deploy Engineer
- **Files**: src/firebase/config.ts (add Firestore)
- **Collections**:
  - users: { uid, name, email, phone, role, onboardingStatus, createdAt }
  - students: { uid, goals, education, targetExams, weakSubjects, language }
  - mentors: { uid, bio, skills, categories, hourlyRate, availability, verificationStatus }

#### Task 4: Connect GitHub Remote
- **Owner**: CTO (this task)
- **Action**: Create GitHub repo, add remote, push

---

## 24-Hour Priority Order - COMPLETED

1. **✅ DONE**: Auth page real Firebase integration with role in displayName
2. **✅ DONE**: Protected routes with role-based access (App.tsx) + AuthProvider fix
3. **✅ DONE**: Firestore user document creation on signup
4. **✅ DONE**: Firestore data model (src/services/firestore.ts)
5. **✅ DONE**: AI Tutor backend with Groq integration (api/aiTutor.ts)
6. **✅ DONE**: Booking/Payment system (src/services/sessions.ts)
7. **✅ DONE**: Mentor Verification workflow (src/services/verification.ts)
8. **✅ DONE**: QA/Trust fixes (MentorSuccess, Landing, ProtectedRoute, etc.)
9. **✅ DONE**: Firebase project creation and Auth setup
10. **✅ DONE**: Vercel env vars with real Firebase config
11. **BLOCKED**: GROQ_API_KEY for AI Tutor (requires human action)

## Completed This Session

- Auth.tsx: Real Firebase auth integration (signInWithEmailAndPassword, createUserWithEmailAndPassword)
- Auth.tsx: Firestore user document creation with role field
- Auth.tsx: Role stored in displayName as JSON for ProtectedRoute compatibility
- Auth.tsx: Error handling for all Firebase auth error codes
- Auth.tsx: Firebase configuration warning banner
- firebase/config.ts: Added Firestore db export
- TypeScript compiles without errors

---

## Code Implementation Complete

All code work is done. Build passes. The following was implemented:

1. **AuthProvider fix** - Wrapped routes in App.tsx
2. **Firestore services** (src/services/firestore.ts) - Student/mentor profiles
3. **Session services** (src/services/sessions.ts) - Booking, payments, meetings
4. **Verification services** (src/services/verification.ts) - Document upload, admin review
5. **AI Tutor API** (api/aiTutor.ts) - Groq integration, tutor personas
6. **Trust fixes** - Removed misleading claims, added proper disclaimers

---

## Team Coordination

| Role | Task | Status |
|------|------|--------|
| Frontend Engineer | All code implementation | ✅ Complete |
| Auth Deploy Engineer | Firebase setup | ⏳ Waiting for credentials |
| UI Designer | Design review | ✅ Complete |
| QA Trust Agent | QA review & fixes | ✅ Complete |

---

## ✅ Account Setup Complete (2026-05-22)

Firebase project, Auth providers, and Vercel env vars are all configured. The app is production-ready at https://senjr-ai-learning.vercel.app.

One remaining optional task:
1. **GROQ_API_KEY** (free at groq.com) — needed for AI Tutor chat functionality

---

## Notes

- No paid APIs/services have been chosen
- All work follows zero-budget principle from CEO brief
- Security: Firebase rules will block public writes
- Voice/call features deferred until core MVP working