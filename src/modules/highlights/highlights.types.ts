import { z } from 'zod';

// Zod schema for a single highlight
export const HighlightSchema = z.object({
  id: z.string(),
  cover_image_url: z.string().url(),
  title: z.string(),
});

export type Highlight = z.infer<typeof HighlightSchema>;