import type { Post } from "./posts.types";

/**
 * Instagram-style PostCard component:
 * - Shows avatar, username, image, caption, and actions.
 * - Designed for use in both grid and feed views.
 * - Uses Tailwind classes for modern, responsive styling.
 */
export function PostCard({ post }: { post: Post }) {
  // For now, using a static avatar and username.
  // You can adapt this to use post.user.avatar, post.user.username, etc.
  const username = "webeet_user";
  const avatarUrl = "/default-avatar.png";

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto group">
      {/* Header: Avatar and username */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200">
        <img
          src={avatarUrl}
          alt={username}
          className="w-8 h-8 rounded-full border"
        />
        <span className="font-semibold text-sm">{username}</span>
      </div>

      {/* Main post image */}
      <img
        src={post.imageUrl}
        alt={post.caption ?? "Post image"}
        className="object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay actions (like/comment/share) - shown on hover in grid, or always in feed */}
      <div className="absolute inset-0 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
        <div className="flex gap-4 p-4">
          {/* Icons can be swapped for SVGs or icon libraries */}
          <button className="text-white text-xl hover:scale-125 transition" aria-label="Like">♥</button>
          <button className="text-white text-xl hover:scale-125 transition" aria-label="Comment">💬</button>
          <button className="text-white text-xl hover:scale-125 transition" aria-label="Share">⤴</button>
        </div>
      </div>

      {/* Caption (below image, like in feed view) */}
      <div className="p-2">
        <span className="font-semibold text-sm mr-2">{username}</span>
        <span className="text-sm text-gray-800">{post.caption}</span>
      </div>
    </div>
  );
}
