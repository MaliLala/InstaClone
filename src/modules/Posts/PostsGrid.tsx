import { useEffect, useState } from "react";
import type { Post } from "./posts.types";
import { getPosts } from "./posts.api";
import { PostCard } from "./PostCard";

/**
 * Simple 3-column grid that fetches posts on mount.
 * Shows basic loading/error/empty states.
 */
export function PostsGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center">Loading posts...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (posts.length === 0) return <div className="p-4 text-center">No posts yet.</div>;

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
