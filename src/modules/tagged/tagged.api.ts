import type { TaggedPost } from "./tagged.types";
// import { TaggedPostsSchema } from "./tagged.types"; // Uncomment for Zod validation

/**
 * Fetches tagged posts from the backend API.
 * - Sends a GET request to '/tagged/grid'.
 * - Throws an error if the request fails.
 * - Returns the parsed array of TaggedPost objects.
 *
 * @returns {Promise<TaggedPost[]>} - Promise resolving to an array of tagged posts.
 */
export async function getTaggedPosts(): Promise<TaggedPost[]> {
  const res = await fetch("/tagged/grid");
  if (!res.ok) throw new Error("Failed to fetch tagged posts");
  const data = await res.json();

  // For runtime type safety, parse with Zod if you want:
  // return TaggedPostsSchema.parse(data);

  return data;
}
