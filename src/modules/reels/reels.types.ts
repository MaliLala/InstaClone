import { z } from "zod";

/**
 * Zod schema for a single Reel object.
 * - `id`: Unique numeric identifier for the reel.
 * - `imageUrl`: URL to the reel's image or thumbnail (must be a valid URL).
 * - `caption`: Text caption for the reel (required).
 * - `createdAt`: ISO date string when the reel was created.
 */
export const ReelSchema = z.object({
  id: z.number(),
  videoUrl: z.string().url(),
  caption: z.string(),
  thumbnailUrl: z.string(),
  createdAt: z.string(),
  views: z.number(), 
});

// Define the schema for an array of reels by wrapping the single reel schema in z.array()
export const ReelArraySchema = z.array(ReelSchema);

//TypeScript type for a single Reel, inferred from the Zod schema.
 
export type Reel = z.infer<typeof ReelSchema>;
