# Senjr MVP Technical Execution Plan

**Created**: 2026-05-20  
**Owner**: CTO  
**Timeline**: Next 24 hours priority

---

## Current State Assessment

| Component | Status | Action Required |
|-----------|--------|------------------|
| Vercel Deployment | ✅ Live | None |
| Firebase Project | ❌ Not created | BLOCKER - requires account access |
| Firebase Env Vars | ❌ Not set | BLOCKER - depends on above |
| Auth (Firebase) | ❌ Mock navigation | Code work |
| Firestore/Storage | ❌ Not configured | BLOCKER |
| GitHub Remote | ❌ Not connected | Code work (local) |
| AI Tutor | ❌ Mock content | Code work |
| Booking/Payment | ❌ Mock UI | Code work |
| Mentor Verification | ❌ No workflow | Code work |

---

## Phase 1 Execution (Next 24 Hours)

### BLOCKERS (Require Account Access - NOT IN SCOPE)

1. **Create Firebase Project** (baatchetindia@gmail.com account)
   - Create project: senjr-ai-learning
   - Enable Authentication > Email/Password
   - Get 6 config values

2. **Add Vercel Environment Variables**
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID

3. **Redeploy Vercel** to pick up env vars

**Unblock owner**: CEO or account holder (ashisbhakta890@gmail.com)

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

## 24-Hour Priority Order

1. **✅ DONE**: Auth page real Firebase integration with role in displayName
2. **✅ DONE**: Protected routes already exist with role-based access (App.tsx)
3. **✅ DONE**: Firestore user document creation on signup
4. **BLOCKED**: Firebase project creation (needs account access)
5. **BLOCKED**: Vercel env vars (needs above)
6. **PENDING**: Mentor verification workflow
7. **PENDING**: AI tutor backend
8. **PENDING**: Mock test engine

## Completed This Session

- Auth.tsx: Real Firebase auth integration (signInWithEmailAndPassword, createUserWithEmailAndPassword)
- Auth.tsx: Firestore user document creation with role field
- Auth.tsx: Role stored in displayName as JSON for ProtectedRoute compatibility
- Auth.tsx: Error handling for all Firebase auth error codes
- Auth.tsx: Firebase configuration warning banner
- firebase/config.ts: Added Firestore db export
- TypeScript compiles without errors

---

## Team Coordination

| Role | First Task | Status |
|------|-----------|--------|
| Frontend Engineer | Auth.tsx Firebase integration | Ready to start |
| Auth Deploy Engineer | Firestore config + rules | Ready to start |
| UI Designer | Dashboard mockups → real components | Not started |
| QA Trust Agent | Auth flow testing | Not started |

---

## Next Immediate Action

1. **Frontend Engineer**: Start Task 1 - fix Auth.tsx to call real Firebase auth
2. **CTO**: Create GitHub repo and push code
3. **CEO**: Create Firebase project using baatchetindia@gmail.com (external)

---

## Notes

- No paid APIs/services have been chosen
- All work follows zero-budget principle from CEO brief
- Security: Firebase rules will block public writes
- Voice/call features deferred until core MVP working