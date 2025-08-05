import { z } from 'zod';

// Define the schema for creating a reel
const createReelDtoSchema = z.object({
  title: z.string().min(1),            // Title must be a non-empty string
  url: z.string().url(),               // Must be a valid URL
});

// Define the schema for a stored reel (e.g. with DB-generated fields)
const reelSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  created_at: z.string(),              // SQLite DATETIME returns as string
});

// List schema
const reelsSchema = z.array(reelSchema);

// Infer types from Zod schemas
type CreateReelDto = z.infer<typeof createReelDtoSchema>;
type Reel = z.infer<typeof reelSchema>;

export {
  createReelDtoSchema,
  reelSchema,
  reelsSchema,
  CreateReelDto,
  Reel,
};
