import { z } from "zod";

/**
 * Zod schema for a single Post object.
 * - `id`: Unique numeric identifier for the post.
 * - `img_url`: URL to the post image (must be a valid URL).
 * - `caption`: Text caption for the post (nullable: can be null or string).
 * - `created_at`: ISO date string of when the post was created.
 */
const postSchema = z.object({
    id: z.number(),                   // Unique post ID
    img_url: z.string().url(),        // Image URL (must be a valid URL)
    caption: z.string().nullable(),   // Caption (nullable: string or null)
    created_at: z.string(),           // ISO date string (e.g., "2025-08-07T12:00:00Z")
});

/**
 * Zod schema for an array of Post objects.
 */
const postsSchema = z.array(postSchema);

/**
 * TypeScript type for a single post, inferred from the Zod schema.
 */
type Post = z.infer<typeof postSchema>;

export { postSchema, postsSchema };
export type { Post };
