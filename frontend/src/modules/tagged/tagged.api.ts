import type { TaggedPost } from "./tagged.types";
import { TaggedPostsSchema } from "./tagged.types";
import { api } from "@app/services/api";

/**
 * Fetch tagged posts and validate shape.
 */
export async function getTaggedPosts(): Promise<TaggedPost[]> {
  const res = await api.get("/tagged/grid");
  return TaggedPostsSchema.parse(res.data);
}
