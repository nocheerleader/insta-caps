## 2 · Technical Specification

### 2.1 Stack

• **Frontend**: Next.js 14 / React 18, App Router, Tailwind, shadcn/ui.
• **State**: Zustand (UI), TanStack Query (server).
• **Backend**: Next.js Route Handler `/api/generate`, running as Vercel Edge Function.
• **AI**: OpenAI GPT‑4o Vision (`gpt-4o-mini-vision`) via streaming JSON mode.
• **Rate Limiting**: Upstash Redis KV.

### 2.2 Architecture (thin‑backend)

```
Client (Next.js) ──► /api/generate (Edge) ───► OpenAI Vision
         ▲                   │
         └── Upstash Rate KV ◄┘
```

No database; images kept in‑memory only.
All serverless; deploy on Vercel.

### 2.3 Data Flow

1. User selects image → `compressImage()` in browser (browser-image-compression).
2. Image converted to Base64 string.
3. POST fetch `{tone, imageBase64}` to `/api/generate-captions`.
4. Edge function:
   - Validate size & type.
   - Moderation endpoint; abort on flag.
   - Build prompt: system msg + tone template + rules.
   - Stream response back (`ReadableStream`).
5. Client consumes stream, assembles JSON, updates Zustand store.
6. TanStack Query handles loading / error.

### 2.4 API Contract

`POST /api/generate`
Req JSON:

```ts
{ image: string; // base64
  tone: "roast"|"basic"|… }
```

Resp 200:

```ts
{ captions: string[] } // length 3
```

Resp 4xx: `{ error: string; code: "RATE_LIMIT"|"MODERATION"|"FAIL" }`

### 2.5 Components

• **UploadButton** – drag+drop / click.
• **ToneCard** – preset card.
• **Spinner** – full‑screen.
• **CaptionCard** – text + buttons.
• **ErrorBanner** – friendly WTF happened.

### 2.6 State Diagram

| Store             | Fields                                            |
| ----------------- | ------------------------------------------------- |
| uiStore (Zustand) | step, selectedTone, imageFile, captions\[], error |
| query (TanStack)  | generate(imageHash,tone)                          |

### 2.7 Rate Limiter (Edge)

```ts
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});
```

### 2.8 Prompt Builder (server)

````ts
System: `You are an Instagram caption generator…`
User:
```json
{
  "tone": "{{tone}}",
  "rules": "≤20 words each, reference the image",
  "image": <base64>
}
---

### 2.9 Error Handling

* OpenAI refusal → 422 MODERATION.
* Any fail → return 3 canned captions:

  1. “When AI abandons you, drop a cat pic.”
  2. “Caption error? Just post a meme.”
  3. “Error 404: wit not found.”

- Errors
• **400** Invalid input.
• **429** Rate limited.
• **422** Policy violation.
• **500** OpenAI exploded.

### 2.10 Security

• Strip EXIF.
• CSP headers.
• No eval on client prompt.
• CSP: img-src 'self' data:.
• No cookies.
• Sanitize all text.

### 2.11 Deployment

• Vercel project.

### 2.12 Testing

* Unit: prompt builder.
* E2E: Cypress happy path + refusal path.
* Lighthouse performance.

### 2.13 Timeout

Abort fetch after 25 s server-side, 30 s client-side.

### 2.14 Environment Variables (.env.local)

OPENAI_API_KEY= `OPENAI_API_KEY` secret
UPSTASH_REDIS_REST_URL= `UPSTASH_REDIS_REST_URL`
UPSTASH_REDIS_REST_TOKEN= `UPSTASH_REDIS_REST_TOKEN`

---

## 3 · Supporting Files

| File                     | Purpose                               |
| ------------------------ | ------------------------------------- |
| `src/lib/tonePresets.ts` | tone, label, prompt snippet           |
| `theme.md`               | palette & typography (already exists) |
| `README.md`              | dev setup, env vars, run scripts      |
| `.vscode/settings.json`  | format on save, etc.                  |

---

## 4 · Task Breakdown (≤ 1 SP each)

1. [ ] Scaffold Next.js app / Tailwind +  shadcn config (use the theme.md file)
2. [ ] Build UploadButton + client compression
3. [ ] Tone selection component + ToneCard grid
4. [ ] Zustand store skeleton
5. [ ] Edge route `/api/generate` with ratelimit stub
6. [ ] OpenAI vision integration
7. [ ] CaptionCard UI + Copy/Regenerate
8. [ ] Rate limit middleware
9. [ ] ErrorBanner handling: screens & fallback copy
10. [ ] Share link helper
11. [ ] Deploy to Vercel

## 5. Tone Prompts file

tones = {
"Roast": "Act like a Gen Z influencer who weaponizes humor and irony. Using the attached photo, write 3 unhinged Instagram captions that go viral for being bold, self-deprecating, or brutally real. Captions can include made-up slang, chaotic phrasing, or emotional whiplash. No inspirational quotes. Just feral energy. ≤20 words.",
"Basic Bitch": "Channel pumpkin-spice-latte vibes. Write 3 cute, basic captions tied to the photo. Include emojis. Keep it <20 words.",
"Couples Cringe": "Gushy, PDA-soaked energy. Reference the photo and drop 3 captions dripping with ‘us vs the world’ cheese. <20 words.",
"Sarcastic": "Write 3 dry, sarcastic captions that roast the photo subject. No positivity allowed. Max 20 words.",
"Self-Love": "Positive affirmations rooted in what you see. 3 captions, <20 words, empowering without being preachy.",
"Gay BFF": "Sassy, supportive, campy. 3 captions referencing the photo with queer flair. Sprinkle emojis. <20 words."
}

prompts_content = json.dumps(tones, indent=2)
````
