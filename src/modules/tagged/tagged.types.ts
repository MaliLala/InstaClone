import { z } from "zod";

/**
 * Shape returned by backend /tagged/grid after snake_case -> camelCase mapping:
 *   img_url     -> imageUrl
 *   tagged_by   -> taggedBy
 *   created_at  -> createdAt
 */
export const TaggedPostSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  caption: z.string().nullable().optional(),
  taggedBy: z.string().default("unknown"),
  createdAt: z.string()
});

export const TaggedPostsSchema = z.array(TaggedPostSchema);
export type TaggedPost = z.infer<typeof TaggedPostSchema>;
