# Senjr Design System

## Brand Identity

Senjr is a peer-learning edtech platform built for Indian students. The brand pairs
**young, confident energy** with **trustworthy expertise** — seniors who *just cleared*
the exams students are aiming for.

### Brand Voice
- **Hinglish-friendly** — informal Hindi/English mix where natural
- **Direct & confident** — no fluff, no corporate speak
- **Encouraging** — "Maine khud yeh kiya hai, tum bhi kar sakte ho"

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--senjr-green` | `#10B981` | Primary actions, student roles, success |
| `--senjr-green-dark` | `#059669` | Hover, borders |
| `--senjr-green-darker` | `#047857` | Active/pressed states |
| `--senjr-green-light` | `#D1FAE5` | Green backgrounds, badges |
| `--senjr-green-lighter` | `#ECFDF5` | Card backgrounds |
| `--senjr-green-bg` | `#F0FDF4` | Page/section backgrounds |
| `--senjr-orange` | `#F97316` | CTA, mentor roles, warnings |
| `--senjr-orange-dark` | `#EA580C` | Hover, borders |
| `--senjr-orange-darker` | `#C2410C` | Active/pressed |
| `--senjr-orange-light` | `#FFEDD5` | Orange backgrounds, badges |
| `--senjr-orange-lighter` | `#FFF7ED` | Card backgrounds |
| `--senjr-black` | `#0F172A` | Headings, dark cards, neo shadows |
| `--senjr-text` | `#0F172A` | Body text |
| `--senjr-text-secondary` | `#334155` | Secondary text |
| `--senjr-text-muted` | `#64748B` | Captions, hints |
| `--senjr-text-light` | `#94A3B8` | Disabled, placeholders |

### Color Psychology
- **Green** = Growth, learning, affordability (student-facing)
- **Orange** = Energy, expertise, premium (mentor-facing)
- **Black** = Contrast, neo-brutalist frames, authority

---

## Typography

- **Font Stack**: `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`
- **Base Size**: 16px (mobile-optimized)

| Element | Size | Weight | Letter-spacing |
|---------|------|--------|----------------|
| Hero title (H1) | 34px | 800 | -0.5px |
| Section title (H2) | 18-20px | 800 | -0.3px |
| Card title (H3) | 16px | 700 | -0.2px |
| Body | 14-15px | 400-500 | normal |
| Caption | 11-13px | 500 | normal |
| Badge/Tag | 11-12px | 600 | normal |

---

## Spacing & Layout

- **Mobile container**: `max-width: 480px; margin: 0 auto`
- **Content padding**: `16px` (horizontal)
- **Page bottom padding**: `80px` (for bottom nav)
- **Card gap**: `16px` vertical, `12px` grid
- **Section gap**: `20-28px`

---

## Component Library

### Cards

| Variant | Class | When to use |
|---------|-------|-------------|
| Default card | `.senjr-card` | General purpose |
| Flat card | `.senjr-card-flat` | Grid items, action buttons |
| Green card | `.senjr-card-green` | Positive stats, XP, success states |
| Orange card | `.senjr-card-orange` | Warnings, upcoming sessions, CTAs |
| Neo card | `.senjr-card-neo` | Bookable items, important CTAs |
| Neo green | `.senjr-card-neo-green` | Pricing, journey stats |
| Neo orange | `.senjr-card-neo-orange` | Test overviews, warnings |

### Buttons

| Variant | Class | Usage |
|---------|-------|-------|
| Primary green | `.senjr-btn-green` | Student actions, confirm |
| Primary orange | `.senjr-btn-orange` | Mentor actions, start test |
| Outline | `.senjr-btn-outline` | Secondary actions |
| Small | `.senjr-btn-sm` | Inline actions |
| Extra small | `.senjr-btn-xs` | Tags, joins |
| Icon button | `.senjr-btn-icon` | Toolbar icons |

### Inputs

| Pattern | Class | Notes |
|---------|-------|-------|
| Text input | `.senjr-input` | 15px font for mobile |
| With icon | `.senjr-input-icon` | Position icon inside |
| Textarea | `textarea.senjr-input` | Min 80px height |
| Select + chevron | Custom | Use `ChevronDown` icon |

### Navigation

- **Bottom nav**: `.senjr-bottom-nav` — fixed at bottom, 480px max-width
  - Active item: `.senjr-nav-item-active` (green)
  - Only 4 items max
  - Center action button for mentor nav (video call icon)
- **Header**: `.senjr-header` — sticky, with back button + title + optional action
- **Tabs**: `.senjr-tabs` / `.senjr-tab` — pill-style segmented control
- **Step indicator**: `.senjr-step-indicator` — for onboarding flows

### Feedback

| Element | Class | Details |
|---------|-------|---------|
| Badge | `.senjr-badge` | Pill-shaped, green/orange variants |
| Tag | `.senjr-tag` | Smaller pill for metadata |
| Chip | `.senjr-chip` / `.senjr-chip-active` | Filter options, skill selectors |
| Toast | `.senjr-toast` | Fixed top notification |
| Progress bar | `.senjr-progress-bar` / `.senjr-progress-fill` | 6px height, rounded |
| Status dot | `.senjr-status-dot-online/offline/away` | 8px circle |
| Empty state | `.senjr-empty-state` | Centered with icon + text |

### Avatars

| Size | Class | Dimensions |
|------|-------|------------|
| Default | `.senjr-avatar` | 48x48px |
| Large | `.senjr-avatar-lg` | 80x80px |
| XL | `.senjr-avatar-xl` | 100x100px |
| Group | `.senjr-avatar-group` | Stacked with -8px overlap |

---

## Design Patterns

### Neo-Brutalism

Senjr uses a **restrained neo-brutalist** style:
- Heavy outlines (`1.5-2px solid`)
- Hard shadows (`3px 3px 0 var(--senjr-text)`)
- Rounded corners (10-14px) to soften
- Avoid over-decoration — let the shadow create hierarchy

### Mobile-First Gestures
- All interactive elements are minimum 44px tap target
- Horizontal scroll for progress cards, mentor lists
- Pull-to-refresh mental model via `fadeIn`/`slideUp` animations
- Bottom sheets for selects, tutor picker

### Onboarding Flows

**Student**: Signup → Education → Goals → Profile → Dashboard
**Mentor**: Signup → Verify ID → Intro Video → Profile → Success

Each step shows:
- Progress bar (dark/light segments)
- Icon + title (+ Hinglish-friendly subtitle)
- One primary action per screen
- Skip/back option

---

## Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--senjr-transition-fast` | 0.15s ease | Hover, active states |
| `--senjr-transition` | 0.25s ease | Card hover, toggle |
| `--senjr-transition-slow` | 0.35s ease | Modal, page transitions |

### Keyframes
- `fadeIn` — 0.3s for cards, sections
- `slideUp` — 0.3s for new content
- `slideInRight` — 0.25s for chat messages
- `pop` — 0.3s cubic-bezier for modals, success states
- `shimmer` — skeleton loading
- `pulse` — live indicators, alerts
- `typingBounce` — AI typing dots

---

## Shadow Tokens

| Token | Value |
|-------|-------|
| `--senjr-shadow-neo` | `3px 3px 0 var(--senjr-text)` |
| `--senjr-shadow-neo-sm` | `2px 2px 0 var(--senjr-text)` |
| `--senjr-shadow-neo-green` | `3px 3px 0 var(--senjr-green)` |
| `--senjr-shadow-neo-orange` | `3px 3px 0 var(--senjr-orange)` |

---

## Screen Map

| Route | Screen | Role |
|-------|--------|------|
| `/` | Landing page | Public |
| `/auth` | Login/Signup | Public |
| `/student-signup` | Student onboarding step 1 | Student |
| `/onboarding/student/education` | Student step 2 | Student |
| `/onboarding/student/goals` | Student step 3 | Student |
| `/onboarding/student/profile` | Student step 4 | Student |
| `/mentor-signup` | Mentor onboarding step 1 | Mentor |
| `/onboarding/mentor/verify` | Mentor step 2 | Mentor |
| `/onboarding/mentor/video` | Mentor step 3 | Mentor |
| `/onboarding/mentor/profile` | Mentor step 4 | Mentor |
| `/onboarding/mentor/success` | Mentor step 5 | Mentor |
| `/dashboard/student` | Student dashboard | Student |
| `/dashboard/mentor` | Mentor hub | Mentor |
| `/dashboard/admin` | Admin panel | Admin |
| `/ai-tutor` | AI tutor chat | All |
| `/intensive` | Exam center | All |
| `/mock-test` | Mock test | All |
| `/live-session` | Live session | All |
| `/book-session` | Book session | Student |
| `/availability` | Set availability | Mentor |
| `/mentor-portfolio` | Mentor portfolio | All |
| `/profile` | User profile | All |

---

## Accessibility

- All interactive elements have hover/active/focus states
- Color is never the sole indicator (icons + text accompany badges)
- `min-height: 100dvh` for proper mobile viewport
- `font-size: 15px` on inputs to prevent iOS zoom
- `font-variant-numeric: tabular-nums` on countdowns
- `env(safe-area-inset-bottom)` for notched phones
