import { z } from 'zod';

expoert const TaggedPostSchema = z.object({
    id: z.string(),
    tagged_by: z.string(),
    post_content: z.string(),
});

export type TaggedPost = z.infer<typeof TaggedPostSchema>;