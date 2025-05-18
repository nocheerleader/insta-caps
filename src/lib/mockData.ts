import type { ApiErrorCode } from "./types";

/**
 * Mock captions for UI development when API is not ready.
 */
export const mockCaptions: string[] = [
  "This is a witty mock caption from the AI! #mockingjay",
  "Here's another brilliant (not really) example. #instaGenius",
  "And a third one, just for good measure. #mockTheSystem",
];

/**
 * Example mock API error for UI development.
 */
export const mockApiError: { error: string; code: ApiErrorCode } = {
  error: "Oops! The AI is taking a nap. Here are some classics instead.",
  code: "FAIL", // Using one of the defined ApiErrorCodes
};

/**
 * Fallback captions as specified in techspec.md (Section 2.9).
 * To be used when the AI fails or returns a moderation error.
 */
export const fallbackCaptions: string[] = [
  "When AI abandons you, drop a cat pic.",
  "Caption error? Just post a meme.",
  "Error 404: wit not found.",
];
