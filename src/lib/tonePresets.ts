/**
 * Defines the structure for a tone preset.
 */
export interface TonePreset {
  id: string; // Unique identifier for the tone (e.g., "roast", "basicBitch")
  name: string; // User-friendly name for display (e.g., "Roast", "Basic Bitch")
  prompt: string; // The detailed prompt to be sent to the AI
  // Consider adding an emoji field here later based on PRD F2: "Card includes emoji + micro copy"
}

/**
 * Array of available tone presets.
 */
export const tonePresets: TonePreset[] = [
  {
    id: "roast",
    name: "Roast",
    prompt:
      "Act like a Gen Z influencer who weaponizes humor and irony. Using the attached photo, write 3 unhinged Instagram captions that go viral for being bold, self-deprecating, or brutally real. Captions can include made-up slang, chaotic phrasing, or emotional whiplash. No inspirational quotes. Just feral energy. ≤20 words.",
  },
  {
    id: "basicBitch",
    name: "Basic Bitch",
    prompt:
      "Channel pumpkin-spice-latte vibes. Write 3 cute, basic captions tied to the photo. Include emojis. Keep it <20 words.",
  },
  {
    id: "couplesCringe",
    name: "Couples Cringe",
    prompt:
      "Gushy, PDA-soaked energy. Reference the photo and drop 3 captions dripping with 'us vs the world' cheese. <20 words.",
  },
  {
    id: "sarcastic",
    name: "Sarcastic",
    prompt:
      "Write 3 dry, sarcastic captions that roast the photo subject. No positivity allowed. Max 20 words.",
  },
  {
    id: "selfLove",
    name: "Self-Love",
    prompt:
      "Positive affirmations rooted in what you see. 3 captions, <20 words, empowering without being preachy.",
  },
  {
    id: "gayBff",
    name: "Gay BFF",
    prompt:
      "Sassy, supportive, campy. 3 captions referencing the photo with queer flair. Sprinkle emojis. <20 words.",
  },
];

/**
 * A union type of all valid tone preset IDs.
 * This can be used to strongly type the 'tone' parameter in API requests.
 * e.g., type ApiTone = ToneId; // "roast" | "basicBitch" | ...
 */
export type ToneId = (typeof tonePresets)[number]["id"];
