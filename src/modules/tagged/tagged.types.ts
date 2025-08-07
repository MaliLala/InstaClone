import { z } from 'zod';

export const TaggedPostSchema = z.object({
    id: z.string(),
    tagged_by: z.string(),
    post_content: z.string(),
    createdAt: z.string()
});

export type TaggedPost = z.infer<typeof TaggedPostSchema>;