import { z } from "zod";

/**
 * Zod schema for a single Reel object.
 * - `id`: Unique numeric identifier for the reel.
 * - `video_url`: URL to the reel video file.
 * - `thumbnail_url`: URL to the generated video thumbnail.
 * - `caption`: Text caption for the reel (nullable).
 * - `views`: Number of times the reel has been viewed (must be >= 0).
 * - `created_at`: ISO date string when the reel was created.
 */
const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),   // Always required, must be a valid URL
    caption: z.string().nullable(),    // Can be string or null
    views: z.number().int().min(0),    // Integer, non-negative
    created_at: z.string(),            // ISO string, e.g., "2025-08-07T12:34:56Z"
});

/**
 * Zod schema for an array of Reels.
 */
const reelsSchema = z.array(reelSchema);

/**
 * TypeScript type for a single Reel, inferred from the Zod schema.
 */
type Reel = z.infer<typeof reelSchema>;

export { reelSchema, reelsSchema };
export type { Reel };
