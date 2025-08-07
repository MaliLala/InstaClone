import { z } from "zod";

/**
 * Zod schema for a single Story within a highlight.
 * - `id`: Unique numeric identifier for the story.
 * - `image_url`: URL of the story image (must be a valid URL).
 * - `created_at`: ISO date string of when the story was created.
 */
export const storySchema = z.object({
  id: z.number(),
  image_url: z.string().url(),
  created_at: z.string(), // ISO date string, e.g. "2025-08-07T12:00:00Z"
});

/**
 * Zod schema for a single Highlight.
 * - `id`: Unique numeric identifier for the highlight.
 * - `title`: Title of the highlight.
 * - `cover_image`: URL of the cover image for the highlight (must be a valid URL).
 * - `stories`: Array of story objects belonging to this highlight.
 * - `created_at`: ISO date string when the highlight was created.
 */
export const highlightSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover_image: z.string().url(),
  stories: z.array(storySchema),
  created_at: z.string(), // ISO date string
});

/**
 * Zod schema for an array of highlights.
 */
export const highlightsSchema = z.array(highlightSchema);

/**
 * TypeScript type for a single story (inferred from storySchema).
 */
export type Story = z.infer<typeof storySchema>;

/**
 * TypeScript type for a single highlight (inferred from highlightSchema).
 */
export type Highlight = z.infer<typeof highlightSchema>;
