import type { Post } from "./posts.types";

/**
 * Sorts an array of posts by creation date, most recent first.
 * 
 * @param posts - The array of Post objects to sort.
 * @returns A new array of posts sorted by created_at descending.
 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
