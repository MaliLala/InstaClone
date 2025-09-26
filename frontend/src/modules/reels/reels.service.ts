import { z } from "zod";

/**
 * Zod schema for a single Reel object.
 * - `id`: Unique numeric identifier for the reel.
 * - `videoUrl`: URL to the reel's video file (must be a valid URL).
 * - `thumbnailUrl`: URL to the reel's thumbnail image (must be a valid URL).
 * - `caption`: Nullable string caption for the reel.
 * - `views`: Number of views (integer, must be >= 0).
 * - `createdAt`: ISO date string when the reel was created.
 */
export const ReelSchema = z.object({
  id: z.number(),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  caption: z.string().nullable(),
  views: z.number().int().min(0),
  createdAt: z.string(), // ISO date string
});

/**
 * TypeScript type for a single Reel, inferred from the Zod schema.
 */
export type Reel = z.infer<typeof ReelSchema>;

/**
 * Async function to fetch all reels.
 * This is an example stub; replace with your real API call or database fetch.
 *
 * Promise resolving to an array of Reel objects.
 */
export async function getAllReels(): Promise<Reel[]> {
  return [
    {
      id: 1,
      videoUrl: "https://example.com/video1.mp4",
      thumbnailUrl: "https://example.com/thumb1.jpg",
      caption: "Sample reel 1",
      views: 123,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      videoUrl: "https://example.com/video2.mp4",
      thumbnailUrl: "https://example.com/thumb2.jpg",
      caption: "Sample reel 2",
      views: 456,
      createdAt: new Date().toISOString(),
    },
    // Add more reels or fetch dynamically
  ];
}
