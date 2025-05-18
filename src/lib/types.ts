import type { ToneId } from "./tonePresets"; // Import the ToneId type

/**
 * Request payload for the /api/generate endpoint.
 */
export interface ApiGenerateRequest {
  image: string; // Base64 encoded image
  tone: ToneId; // Use the strongly-typed ToneId
}

/**
 * Successful response payload from the /api/generate endpoint.
 */
export interface ApiGenerateSuccessResponse {
  captions: string[]; // Array of 3 captions
}

/**
 * Error codes for API responses.
 */
export type ApiErrorCode = "RATE_LIMIT" | "MODERATION" | "FAIL";

/**
 * Error response payload from the /api/generate endpoint.
 */
export interface ApiErrorResponse {
  error: string; // Error message
  code: ApiErrorCode;
}

/**
 * Represents the possible responses from the /api/generate endpoint.
 */
export type ApiGenerateResponse = ApiGenerateSuccessResponse | ApiErrorResponse;
