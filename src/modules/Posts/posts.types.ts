/**
 * TypeScript type definition for a single Post.
 * - `id`: Unique numeric identifier for the post.
 * - `imageUrl`: URL string for the post image.
 * - `caption`: Optional caption text (can be string or undefined).
 * - `createdAt`: ISO date string when the post was created.
 */
export type Post = {
  id: number;
  imageUrl: string;
  caption?: string;
  createdAt: string;
};
