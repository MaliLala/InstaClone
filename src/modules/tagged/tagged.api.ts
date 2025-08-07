import type { TaggedPost } from "./tagged.types";

export async function getTaggedPosts(): Promise<TaggedPost[]> {
  const res = await fetch("/tagged/grid");
  if (!res.ok) throw new Error("Failed to fetch tagged posts");
  return res.json();
}
