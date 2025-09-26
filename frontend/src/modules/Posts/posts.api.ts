import type { Post } from "./posts.types";
import { PostArraySchema } from "./posts.types";
import { api } from "@app/services/api";

/**
 * Fetch posts for the grid. Validated with Zod to catch shape drift.
 */
export async function getPosts(): Promise<Post[]> {
  const res = await api.get("/posts/grid");
  return PostArraySchema.parse(res.data);
}
