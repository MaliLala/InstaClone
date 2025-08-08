import { z } from "zod";

/**
 * Shape returned by backend /reels/grid.
 * Backend maps:
 *   video_url     -> videoUrl
 *   thumbnail_url -> thumbnailUrl
 *   created_at    -> createdAt
 */
export const ReelSchema = z.object({
  id: z.number(),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  caption: z.string().nullable().optional(),
  views: z.number(),
  createdAt: z.string()
});

export const ReelArraySchema = z.array(ReelSchema);
export type Reel = z.infer<typeof ReelSchema>;

/**
 * DTO for creating a reel via POST /reels.
 * We keep backend's expected field names explicit (snake_case).
 */
export const CreateReelDtoSchema = z.object({
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().nullable().optional(),
  views: z.number().default(0)
});
export type CreateReelDto = z.infer<typeof CreateReelDtoSchema>;
