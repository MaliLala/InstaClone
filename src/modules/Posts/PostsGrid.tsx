import { useEffect, useState } from "react";
import { getPosts } from "./posts.api";
import type { Post } from "./posts.types";

/**
 * PostsGrid component
 * - Fetches and displays posts in a responsive, Instagram-style grid.
 * - Shows loading indicator while fetching.
 * - Displays a message if there are no posts.
 */
export function PostsGrid() {
  // Local state for posts and loading status
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on mount
  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setPosts([]); // fallback to empty array
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Posts
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : posts.length > 0 ? (
        // Responsive grid: 2 columns on mobile, 3-4 on larger screens
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden rounded-lg group shadow-md"
            >
              {/* Post image with hover-zoom effect */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-white text-sm font-medium p-2 text-center">
                  {post.caption}
                </p>
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
