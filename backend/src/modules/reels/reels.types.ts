import { z } from 'zod';

const createReelDtoSchema = z.object({
  video_url: z.string().url(),
  caption:   z.string().min(1),
});
type CreateReelDto = z.infer<typeof createReelDtoSchema>;

const reelSchema = z.object({
  id:         z.number(),
  video_url:  z.string().url(),
  caption:    z.string(),
  created_at: z.string(),
});
type Reel = z.infer<typeof reelSchema>;

const reelsSchema = z.array(reelSchema);

export {
  createReelDtoSchema,
  CreateReelDto,
  reelSchema,
  Reel,
  reelsSchema,
};
