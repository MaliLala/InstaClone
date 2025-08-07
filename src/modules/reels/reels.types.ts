import { z } from "zod";

export const ReelSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  caption: z.string(),
  createdAt: z.string()
});

export type Reel = z.infer<typeof ReelSchema>;