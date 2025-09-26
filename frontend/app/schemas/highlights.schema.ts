import { z } from "zod";

/**
 * These schemas are used by the /profile.highlights* routes.
 * The backend normalizes highlight.id to string in the route layer.
 */

export const storySchema = z.object({
  id: z.string(),
  imageUrl: z.string().url(),
  caption: z.string().nullable().optional()
});

export const highlightSchema = z.object({
  id: z.string(),                    // normalized on the backend to avoid number/string mismatches
  cover_image_url: z.string().url(), // backend column name is snake_case
  title: z.string().min(1)
});

export const highlightsSchema = z.array(highlightSchema);

export type Story = z.infer<typeof storySchema>;
export type Highlight = z.infer<typeof highlightSchema>;
