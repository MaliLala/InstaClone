import type { Post } from "./posts.types";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("/posts/grid");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
