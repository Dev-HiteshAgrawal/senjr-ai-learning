# Paperclip CEO Execution Brief for Senjr

Last updated: 2026-05-20.

## Mission

Build Senjr into a working zero-budget AI learning and mentor marketplace platform. The product must feel like a real operating company: students can learn, practice, book mentors, join sessions, use AI tutors, and access verified resources; mentors can build portfolio-grade profiles, prove their work, get hired, teach, and manage sessions.

The CEO should treat this as a company-building mandate, not just a static website task.

## Immediate Business Goal

Turn the current deployed app from a mostly static front-end into a working MVP with:

- Real authentication.
- Student and mentor dashboards.
- Mentor portfolio profiles.
- AI tutor chat inside the app.
- Document/resource upload with validation workflow.
- Exam practice/test environment.
- Booking and meeting workflow.
- Admin/research/quality workflow.

## Current Product Reality

The app is live at:

https://senjr-ai-learning.vercel.app

But the current implementation is not yet fully working:

- Vercel has no Firebase environment variables.
- Firebase project is not created/connected.
- Main auth page currently routes users forward instead of doing real signup/login.
- OTP/phone login is not implemented.
- AI tutor chat is currently mock content.
- Document uploads and mentor certificates do not have validation.
- Booking/payment flow is UI-only.
- Live meeting page is local camera/mic UI, not a real room with mentor/student access control.
- Dashboard/profile buttons need real state and navigation review.
- GitHub remote is not connected.

## CEO Operating Rules

1. Keep everything on free tiers until there is a clear reason to pay.
2. Do not add fake "working" features. If a feature is mock, label it internally and replace it.
3. Build with real users in mind: students, exam aspirants, mentors, companies hiring mentors, and internal admin/quality teams.
4. Every feature needs acceptance checks: what should happen, who can access it, and what data should be saved.
5. Security comes before growth: no exposed private keys, no public write access, and no blind trust in uploaded documents.
6. Research must be continuous: inspect competitors, student pain points, mentor workflows, pricing, exam trends, and learning outcomes.

## Phase 1: Stabilize Access and Accounts

Owner: CEO + technical operator.

Tasks:

- Create Firebase project under the chosen company Gmail.
- Enable Email/Password auth.
- Decide whether phone OTP is required now. If yes, configure Firebase phone auth and authorized domains.
- Add Firebase web config values to Vercel environment variables.
- Redeploy production.
- Fix `src/pages/Auth.tsx` so login/signup calls actual Firebase auth functions.
- Add error messages for wrong password, existing email, weak password, and missing Firebase config.
- Add protected routes so dashboard pages require login.
- Add role-based routing: student, mentor, pending mentor, admin.

Acceptance:

- A new user can sign up and appears in Firebase Authentication.
- A returning user can log in.
- Wrong credentials show a clear message.
- Logged-out users cannot open dashboard-only routes.
- The live Vercel site works from a normal browser.

## Phase 2: Data Model and Storage

Recommended free stack:

- Firebase Auth for identity.
- Firestore for user, mentor, session, resource, and test metadata.
- Firebase Storage for certificates, IDs, PDFs, thumbnails, and generated resources.
- Vercel for hosting.

Core collections:

- `users`: uid, name, email, phone, role, onboarding status, createdAt.
- `students`: goals, education, target exams, weak subjects, language, learning preferences.
- `mentors`: bio, skills, categories, hourly rate, availability, verification status, portfolio fields.
- `mentorDocuments`: file path, document type, submittedBy, status, reviewer notes, hash, uploadedAt.
- `sessions`: studentId, mentorId, topic, time, duration, payment status, meeting room id, join window.
- `resources`: subject, exam, topic, file, author, reviewer status, quality score, version.
- `mockTests`: exam, paper config, questions, duration, scoring rules.
- `aiTutorLogs`: userId, tutorId, prompt type, timestamps, token usage summary.
- `adminTasks`: verification, content review, support, fraud flags.

## Phase 3: Mentor Verification and Portfolio

Problem:

Right now, anyone can upload any certificate, ID, result, FIR, or duplicate document without a real verification workflow.

CEO mandate:

- Build mentor verification as a staged trust system, not a simple upload form.

Required workflow:

1. Mentor submits identity, education/professional proof, expertise proof, and intro video.
2. Each upload gets a status: pending, approved, rejected, needs clarification.
3. Store document metadata and file hash to catch duplicate uploads.
4. Add manual admin review screen.
5. Add warning flags for repeated documents, mismatched names, suspicious file types, and missing proof.
6. Do not claim documents are verified until an admin/reviewer approves them.
7. Mentor profile should show verified badges only for approved claims.

Portfolio profile requirements:

- Strong first impression: name, headline, verified skills, rating, availability, price, hire button.
- About section.
- Skills and subjects.
- Certificates and proofs.
- Work samples and teaching samples.
- Student reviews.
- Course/resources created by mentor.
- Company-facing view for hiring.
- Student-facing view for booking.

## Phase 4: AI Tutor System

Problem:

Current AI tutor page is static. Students need in-app chat, not redirection to another app.

CEO mandate:

- Build AI tutor as a real in-app assistant with text input first, then image input/output when provider support is ready.
- Use free/low-cost provider options first, but do not choose a weak model if it makes the tutor worse than free ChatGPT.

Recommended technical approach:

- Add a backend API route, not direct provider keys in the browser.
- Start with text chat plus subject-specific system prompts.
- Add image upload for question solving through a vision-capable free/low-cost model if available.
- Add per-user rate limits.
- Save minimal learning history for personalization.
- Add "explain step by step", "give hint", "make practice question", "check my answer", and "revise topic" actions.

Tutor personas:

- JEE Mathematics tutor.
- UP Police/UP Constable exam tutor.
- English and reasoning tutor.
- General school/college tutor.
- Mentor helper tutor that teaches mentors how to use Senjr, create resources, handle students, and improve profile quality.

Each tutor needs:

- Greeting message.
- Domain-specific behavior.
- Allowed subjects.
- Refusal rules for cheating, fake documents, illegal help, or harmful actions.
- Step-by-step teaching style.
- Practice question generator.
- Answer checking.
- Mistake diagnosis.

Voice/call:

- Add later after text chat works.
- If using Vapi or similar, check free limits first.
- Do not add paid calling until the core app has traction.

## Phase 5: Resources and Course Quality

CEO mandate:

- Build a content team workflow. The app should not publish unchecked files.

Resource workflow:

1. Teacher creates resource.
2. AI checks for formatting, missing answers, and likely mistakes.
3. Human reviewer checks every question.
4. Second reviewer checks difficult/high-stakes questions.
5. Version is published only after approval.
6. Every resource has topic, exam, difficulty, author, reviewer, version, and last checked date.

Initial resources to create:

- JEE Mathematics: limits, derivatives, integration basics, coordinate geometry, quadratic equations.
- UP Police/UP Constable: general knowledge, Hindi, reasoning, mathematics, current affairs.

Quality rule:

- For exam resources, every question should include final answer, full steps, common mistake, difficulty, and topic tag.

## Phase 6: Mock Test Engine

CEO mandate:

- Build realistic exam simulation, not just a list of questions.

Required features:

- User selects exam.
- App generates or loads a paper with exact question count, time limit, marks, and difficulty pattern.
- Timer starts.
- User answers MCQs.
- Auto-submit when time ends.
- Result screen shows score, accuracy, time spent, weak topics, and explanations.
- Save attempt history.

Initial exams:

- UP Police/UP Constable practice test.
- JEE Mathematics topic tests.

Acceptance:

- Test can be started, completed, scored, and reviewed without leaving the app.

## Phase 7: Booking, Payment, and Meeting Access

Problem:

Current booking/payment is mock. Live session is not a secure mentor-student meeting room.

CEO mandate:

- Build a free MVP booking flow first.
- Payment can start as manual confirmation or sandbox until a real payment provider is ready.

Session workflow:

1. Student selects mentor, topic, date, duration.
2. Student confirms booking.
3. Mentor receives booking request.
4. Mentor confirms.
5. Session creates a meeting room.
6. Join button appears only for that student and that mentor.
7. Join window opens 15 minutes before start.
8. Room remains open until scheduled end plus a small grace period.

Meeting implementation:

- MVP: use a generated Google Meet/Jitsi link or free embedded room if acceptable.
- Later: self-host LiveKit or use another provider only if free limits fit.

Payment:

- Since budget is zero, start with payment status states: pending, confirmed, failed, refunded.
- Add Razorpay/Stripe only when account and business details are ready.
- Do not show mentor earnings as real paid money until payment provider is connected.

## Phase 8: Dashboard and Navigation

CEO mandate:

- Dashboard must feel operational, not decorative.

Student dashboard:

- Continue learning.
- AI tutor.
- Upcoming sessions.
- Mock tests.
- Resources.
- Weak topics.
- Mentor recommendations.
- Notifications.
- Profile/settings.

Mentor dashboard:

- Booking requests.
- Upcoming sessions.
- Earnings/payment status.
- Portfolio completion.
- Verification status.
- Resource creation.
- Student notes.
- Notifications.

Admin dashboard:

- Mentor verification queue.
- Reported users/content.
- Resource review queue.
- Session/payment issues.
- Analytics.
- Research tasks.

## Phase 9: Company Roles the CEO Should Create

The CEO should create and coordinate these working roles:

- Product manager: defines MVP scope and priorities.
- Research analyst: studies users, exams, competitors, pricing, and content gaps.
- Technical lead: turns scope into architecture and tasks.
- Frontend engineer: dashboard, chat, profiles, tests, booking.
- Backend/Firebase engineer: auth, Firestore, storage, rules, APIs.
- AI engineer: tutor prompts, model routing, rate limits, evaluation.
- Content lead: resources, question banks, test quality.
- Verification analyst: mentor proof review and fraud checks.
- QA tester: tests every student/mentor/admin flow.
- Growth/operator: onboarding mentors, collecting feedback, handling support.

## Execution Priority

Do this order:

1. Real auth and environment setup.
2. Firestore/Storage schema and rules.
3. Fix dashboards and profile buttons.
4. Mentor portfolio and verification workflow.
5. AI tutor text chat.
6. Mock test engine.
7. Resource workflow.
8. Booking and meeting access.
9. Payment integration.
10. Voice/image AI tutor expansion.

## Stop Condition for Codex

After the CEO receives this brief and the working app status, Codex does not need to keep sending messages unless asked again. The CEO should continue planning, hiring virtual roles, refining requirements, and assigning the next tasks.
