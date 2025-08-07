import { useEffect, useState } from "react";
import { getTaggedPosts } from "./tagged.api";
import type { TaggedPost } from "./tagged.types";

export function TaggedGrid() {
  const [posts, setPosts] = useState<TaggedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTaggedPosts()
      .then(setPosts)
      .catch((err) => {
        console.error("Error loading tagged posts", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tagged Posts</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No tagged posts available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative aspect-square overflow-hidden rounded-lg group shadow-md">
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-white text-sm font-medium p-2 text-center">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
