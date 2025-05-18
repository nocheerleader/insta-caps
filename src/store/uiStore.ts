// src/store/uiStore.ts
import { create } from "zustand";
import type { ToneId } from "../lib/tonePresets";

// Define possible steps in the user flow
export type AppStep =
  | "upload"
  | "toneSelection"
  | "generating"
  | "results"
  | "error";

export interface UiState {
  step: AppStep;
  selectedTone: ToneId | null;
  imageFile: File | null; // The original uploaded image file
  imagePreviewUrl: string | null; // For client-side preview
  imageBase64: string | null; // Base64 representation of the compressed image
  captions: string[];
  errorMessage: string | null; // For displaying user-friendly error messages

  // Actions
  setStep: (step: AppStep) => void;
  setSelectedTone: (tone: ToneId | null) => void;
  setImageFile: (file: File | null) => void;
  setImageBase64: (base64: string | null) => void;
  setCaptions: (captions: string[]) => void;
  setErrorMessage: (message: string | null) => void;
  resetToUpload: () => void; // Action to reset state for a new image
}

export const useUiStore = create<UiState>((set, get) => ({
  step: "upload", // Initial step
  selectedTone: null,
  imageFile: null,
  imagePreviewUrl: null,
  imageBase64: null,
  captions: [],
  errorMessage: null,

  setStep: (step) => set({ step }),
  setSelectedTone: (tone) => set({ selectedTone: tone }),
  setImageFile: (file) => {
    const currentPreviewUrl = get().imagePreviewUrl;
    if (currentPreviewUrl) {
      URL.revokeObjectURL(currentPreviewUrl);
    }
    if (file) {
      set({
        imageFile: file,
        imagePreviewUrl: URL.createObjectURL(file),
        imageBase64: null,
        captions: [],
        errorMessage: null,
      });
    } else {
      set({
        imageFile: null,
        imagePreviewUrl: null,
      });
    }
  },
  setImageBase64: (base64) => set({ imageBase64: base64 }),
  setCaptions: (captions) => set({ captions, step: "results" }),
  setErrorMessage: (message) =>
    set({ errorMessage: message, step: "error", captions: [] }),

  resetToUpload: () => {
    const currentPreviewUrl = get().imagePreviewUrl;
    if (currentPreviewUrl) {
      URL.revokeObjectURL(currentPreviewUrl);
    }
    set({
      step: "upload",
      selectedTone: null,
      imageFile: null,
      imagePreviewUrl: null,
      imageBase64: null,
      captions: [],
      errorMessage: null,
    });
  },
}));
