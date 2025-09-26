import { z } from "zod";

/**
 * Shape returned by backend /posts/grid
 * We use camelCase field names in the UI, mapped in the backend route:
 *   img_url -> imageUrl
 *   created_at -> createdAt
 */
export const PostSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  caption: z.string().nullable(),
  createdAt: z.string()
});

export const PostArraySchema = z.array(PostSchema);
export type Post = z.infer<typeof PostSchema>;

/**
 * DTO used for creating a post via POST /posts
 * We keep backend expectations explicit (img_url, caption).
 */
export const CreatePostDtoSchema = z.object({
  img_url: z.string().url(),
  caption: z.string().nullable().optional()
});
export type CreatePostDto = z.infer<typeof CreatePostDtoSchema>;
