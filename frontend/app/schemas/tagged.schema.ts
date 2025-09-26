import { z } from "zod";

/**
 * Zod schema for a single Tagged Post.
 * - `id`: Unique identifier for the tagged post (string or number, always returned as string in the frontend).
 * - `imageUrl`: URL to the image (must be a valid URL).
 * - `caption`: Text caption for the post (required).
 */
export const taggedPostSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String), // Always use as string
  imageUrl: z.string().url(),
  caption: z.string(),
});

/**
 * Zod schema for an array of tagged posts.
 */
export const taggedPostsSchema = z.array(taggedPostSchema);

/**
 * TypeScript type for a single tagged post, inferred from the Zod schema.
 */
export type TaggedPost = z.infer<typeof taggedPostSchema>;
