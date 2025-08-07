import { useEffect, useState } from "react";
import { getPosts } from "./posts.api";
import type { Post } from "./posts.types";

export function PostsGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Posts</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : posts.length > 0 ? (
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
      ) : (
        <div className="text-center text-gray-500">No posts available.</div>
      )}
    </div>
  );
}
