import { ReelArraySchema, type Reel } from "./reels.types";

/**
 * Fetches all reels for the grid view from the backend API.
 * - Sends a GET request to '/reels/grid'.
 * - Parses and validates the response using Zod.
 * - Throws an error if the response is invalid or the fetch fails.
 *
 * @returns {Promise<Reel[]>} - Promise resolving to an array of Reel objects.
 */
export async function getReels(): Promise<Reel[]> {
  const res = await fetch("/reels/grid");
  if (!res.ok) {
    throw new Error("Failed to fetch reels");
  }
  const rawData = await res.json();
  // Validate with Zod for safety
  return ReelArraySchema.parse(rawData);
}
