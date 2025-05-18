# InstaCaptioner – MVP PRD & Tech Spec

---

## 1 · Product Requirements Document (PRD)

### 1.1 Elevator Pitch

Upload a photo → pick a tone → get three scroll‑stopping Instagram captions that actually match the photo. No accounts, no storage. Zero sign‑up, done in <15's.

### 1.2 Problem

Everyone over‑thinks captions. Generic quote generators ignore the photo, so posts flop. Users want fast, on‑brand lines without creative brain‑freeze.

### 1.3 Target User

• 18‑35 yo Instagram power users (creators & casuals).
• Needs: speed, originality, no account friction.
• Social addict – Posts daily, wants fresh tone each time.
• Brand intern – Needs speed, not depth.
• Queer creator – Wants spicy, inclusive captions.

### 1.4 Goals & Success Metrics

| Goal                                      | KPI                   | MVP Target |
| ----------------------------------------- | --------------------- | ---------- |
| Deliver caption that matches photo & tone | Manual QA pass rate   | ≥ 90 %     |
| Fast turnaround                           | Time to first caption | ≤ 10 s p95 |
| Stay cheap                                | OpenAI cost / request | ≤ \$0.005  |
| Stickiness                                | Share button CTR      | ≥ 15 %     |

### 1.5 User Stories (1 SP each, never bigger)

1. As a visitor, I land on mobile web and instantly see one giant “Upload photo” button.
2. As a visitor, after upload I pick one of six tone cards.
3. As a visitor, I get three captions in < 6 s with copy buttons.
4. As a visitor, I can hit **Regenerate** to remix captions with same tone.
5. As a visitor, I can switch tone without re-uploading the photo.
6. As a visitor, I see a funny fallback message if my image is blocked or the AI fails.
7. As a visitor, I’m rate-limited politely (max 5/min).
8. As a visitor, I can share the result link (pre-filled caption + site URL).

### 1.6A Core Features (MUST for MVP)

1. Photo upload (JPG/PNG ≤ 5 MB, auto‑compress to 512×512 JPG).
2. Tone selector (6 preset cards).
3. Vision‑powered caption generation (3 captions <20 words).
4. Copy / Regenerate / Share / Change‑tone CTAs.
5. Privacy & content warnings (no storage, policy banner).
6. Rate‑limit 5 uploads / min / IP; 30 per day.
7. Edge‑function API + graceful error jokes.

### 1.6B Nice‑to‑Have (Post‑MVP)

– Dark mode
– Custom tone prompt
– History if/when auth added.

### 1.7 User Flow

1. Landing page: big **Upload**.
2. Image preview → tone card grid.
3. “Analyzing your photo” spinner.
4. Caption screen with 3 cards → user actions.
5. Optional share page (UTM link).
6. Retry / new photo.

## Functional Requirements

### F1. Image Upload

- Accept `.jpg` or `.png`, max 5 MB.
- Client-side compress to 1 MB target with quality > 70 %.
- Auto-redirect to tone selection.

### F2. Tone Selection

- Six hard-coded cards: Roast, Basic Bitch, Couples Cringe, Sarcastic, Self-Love, Gay BFF.
- Card includes emoji + micro copy (see Appendix).

### F3. Caption Generation

- POST `/api/generate-captions` with `{base64Image, tone}`.
- Backend streams OpenAI GPT-4o Vision with system & user prompts.
- Return JSON `{captions:[…]}`.

### F4. Output Display

- Show three caption cards with:
  - Text (max 20 words).
  - **Copy** button (uses Clipboard API, visual toast “Copied”).
  - **Regenerate** button.
- Secondary row: **Try another tone** and **Share**.

### F5. Error States

- Content policy refusal ⇒ show friendly error: “Nice try. Grandma says no 🤚.”
- API error / timeout ⇒ show fallback captions list.

### F6. Rate Limiting

- 429 on > 5 calls/min/IP with alt text: “Chill, influencer. Try again in a sec.”

### F7. Privacy & Compliance

- No images or captions stored.
- Display notice & warning before upload.

### 1.8 Non‑Functional

- **Mobile-first** (≥ 375 px).
- **Performance**: p95 <150 KB bundle, <2 s FCP mobile.
- **Privacy**: no file write; buffer cleared after response.
- **Compliance**: follow OpenAI policy for refusals.

### 1.9 Out of Scope (MVP)

• User accounts
• DB persistence
• Analytics dashboard
• Multi‑language (English only).
• Caption scheduling/posting to IG.

### 1.10 Risks & Mitigations

| Risk                      | Impact    | Mitigation                                     |
| ------------------------- | --------- | ---------------------------------------------- |
| NSFW uploads → hard block | Brand hit | Leverage OpenAI moderation + manual blocklist  |
| API latency               | Poor UX   | Pre‑compress & small Vision context            |
| Rapid cost spike          | \$\$      | Edge‑cache last 5 min for identical image hash |

### Appendix – Tone Cheatsheet

• **Roast** – Gen Z feral snark.
• **Basic Bitch** – Pumpkin-spice level vanilla.
• **Couples Cringe** – PDA overload.
• **Sarcastic** – Dry, deadpan.
• **Self-Love** – Affirmations and quotes without the woo-woo.
• **Gay BFF** – Camp, supportive, extra-sparkle, drag race slang
