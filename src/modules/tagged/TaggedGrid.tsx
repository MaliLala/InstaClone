import { useEffect, useState } from "react";
import type { TaggedPost } from "./tagged.types";
import { getTaggedPosts } from "./tagged.api";

/**
 * 3-column grid of tagged posts with simple UX states.
 */
export function TaggedGrid() {
  const [posts, setPosts] = useState<TaggedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTaggedPosts()
      .then(setPosts)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load tagged"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center">Loading tagged posts...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (posts.length === 0) return <div className="p-4 text-center">No tagged posts.</div>;

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {posts.map((p) => (
        <div key={p.id} className="relative overflow-hidden rounded-lg shadow aspect-square group">
          <img
            src={p.imageUrl}
            alt={p.caption ?? "tagged"}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {p.caption ? (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-white text-sm font-semibold p-2 text-center">
                {p.caption}
              </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
