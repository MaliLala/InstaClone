import type { Post } from "./posts.types";
import { PostCard } from "./PostCard";

/**
 * PostsList component
 * - Renders a responsive grid of PostCard components.
 * - Can be reused in profile pages, explore feeds, etc.
 *
 * @param posts - Array of Post objects to display.
 */
export function PostsList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <div className="text-center text-gray-500">No posts found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
