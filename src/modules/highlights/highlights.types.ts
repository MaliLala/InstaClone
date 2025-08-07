import { z } from 'zod';

export const createHighlightDtoSchema = z.object({
  cover_image_url: z.string().url(),
  title:           z.string().min(1),
});
export type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>;

// Zod schema for a single highlight
export const HighlightSchema = z.object({
  id: z.string(),
  cover_image_url: z.string().url(),
  title: z.string(),
});

export type Highlight = z.infer<typeof HighlightSchema>;