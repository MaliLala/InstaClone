import { ReelArraySchema, type Reel } from "./reels.types";
import { api } from "@app/services/api";

/**
 * GET /reels/grid
 * Fetch reels for the grid and validate shape.
 */
export async function getReels(): Promise<Reel[]> {
  const res = await api.get("/reels/grid");
  return ReelArraySchema.parse(res.data);
}

/**
 * POST /reels
 * Create a new reel.
 * - The backend expects snake_case keys in the DB layer, but our route/service accepts this payload.
 * - We keep the payload explicit here and map camelCase -> snake_case before sending.
 * - If a thumbnail isn't provided, we just reuse the video URL as a simple fallback.
 */
export async function createReel(input: {
  videoUrl: string;
  thumbnailUrl?: string;
  caption?: string | null;
}): Promise<{
  id: number;
  video_url: string;
  thumbnail_url: string;
  caption: string | null;
  views: number;
  created_at?: string;
}> {
  const payload = {
    video_url: input.videoUrl,
    thumbnail_url: input.thumbnailUrl ?? input.videoUrl,
    caption: input.caption ?? null,
    views: 0,
  };

  const res = await api.post("/reels", payload);
  return res.data;
}
