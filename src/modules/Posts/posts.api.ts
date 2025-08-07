import type { Post } from "./posts.types";

/**
 * Fetches an array of posts from the backend API.
 * - Sends a GET request to `/posts/grid`.
 * - Throws an error if the response is not OK.
 * - Returns the parsed JSON array of Post objects.
 *
 * @returns {Promise<Post[]>} - Promise resolving to an array of posts.
 */
export async function getPosts(): Promise<Post[]> {
  const res = await fetch("/posts/grid");
  if (!res.ok) {
    // You can customize error handling/logging as needed
    throw new Error("Failed to fetch posts");
  }
  // It's often a good idea to validate/parse with your Zod schema here for extra safety
  return res.json();
}
