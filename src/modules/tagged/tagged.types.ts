import { z } from "zod";

/**
 * Zod schema for a single Tagged Post object.
 * - `id`: Unique identifier (string or number, always parsed as string).
 * - `imageUrl`: URL string to the post image (must be valid URL).
 * - `caption`: Required caption string.
 */
export const TaggedPostSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  imageUrl: z.string().url(),
  caption: z.string(),
});

/**
 * Zod schema for an array of tagged posts.
 */
export const TaggedPostsSchema = z.array(TaggedPostSchema);

/**
 * TypeScript type for a single tagged post, inferred from the Zod schema.
 */
export type TaggedPost = z.infer<typeof TaggedPostSchema>;
