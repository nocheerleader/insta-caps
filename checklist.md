# InstaCaptioner Project Checklist

## Phase 1: Project Foundation & Core UI Setup

- [x] **Scaffold Next.js App & Styling (Tech Spec Task 1)**
  - [x] Initialize Next.js, Tailwind, `shadcn/ui` theme
  - [x] Set up `globals.css` with `theme.md` styles
  - [x] Create essential configuration files:
    - [x] `README.md`
    - [x] `.vscode/settings.json`
    - [x] `.env.local` (Manual step for user)
  - [x] Establish basic folder structure (`app/`, `components/`, `lib/`, `store/`)
- [x] **Data Definitions & Mock Content (Core Rule 1)**
  - [x] Define TypeScript interfaces for API request/responses
  - [x] Create `src/lib/tonePresets.ts` (translate Python from `techspec.md` to TypeScript)
  - [x] Prepare mock caption data
- [x] **State Management Setup (Core Rule 1 & Tech Spec Task 4)**
  - [x] Implement Zustand store (`uiStore`) skeleton
  - [x] Set up TanStack Query

## Phase 2: Building the User Interface (Components)

- [ ] **`UploadButton` Component & Image Handling (Tech Spec Task 2 & PRD F1, F7)**
- [ ] **Tone Selection UI (Tech Spec Task 3 & PRD F2)**
- [ ] **Caption Display UI (Tech Spec Task 7 & PRD F4)**
- [ ] **Supporting UI Components (Tech Spec Task 2.5)**
  - [ ] `Spinner` Component
  - [ ] `ErrorBanner` Component

## Phase 3: Backend Logic (API & AI)

- [ ] **API Route Skeleton (Tech Spec Task 5 & PRD F3)**
- [ ] **OpenAI Vision Integration (Tech Spec Task 6 & PRD F3)**
- [ ] **Rate Limiting Implementation (Tech Spec Task 8 & PRD F6)**

## Phase 4: Connecting Frontend & Backend, Final Features

- [ ] **Client-Side API Integration & State Updates**
- [ ] **Share Link Functionality (Tech Spec Task 10 & PRD User Story 8)**
- [ ] **Security Measures (Tech Spec Section 2.10)**

## Phase 5: Testing & Deployment

- [ ] **Testing (Tech Spec Task 12)**
  - [ ] Unit tests (prompt builder)
  - [ ] E2E tests (Cypress - happy path + refusal path)
  - [ ] Lighthouse audits
- [ ] **Deployment to Vercel (Tech Spec Task 11)**
