# InstaCaptioner

Upload a photo → pick a tone → get three scroll‑stopping Instagram captions that actually match the photo.

## Development Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd insta-captioner
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add the following variables:

    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url_here
    UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here
    ```

    Replace the placeholder values with your actual credentials.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `dev`: Runs the app in development mode.
- `build`: Builds the app for production.
- `start`: Starts a production server.
- `lint`: Runs the linter.

## Tech Stack

- Frontend: Next.js 14 / React 18, App Router, Tailwind CSS, shadcn/ui
- State Management: Zustand (UI), TanStack Query (server state)
- Backend: Next.js Route Handler `/api/generate` (Vercel Edge Function)
- AI: OpenAI GPT-4o Vision
- Rate Limiting: Upstash Redis KV

## Deployment

This project is intended for deployment on Vercel.
