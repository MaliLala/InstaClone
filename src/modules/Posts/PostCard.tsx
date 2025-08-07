import type { Post } from "./posts.types";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square group">
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-white text-sm font-semibold p-2 text-center">{post.caption}</p>
      </div>
    </div>
  );
}