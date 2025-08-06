import type { Database } from "better-sqlite3";
import { CreatePostDto } from '@/modules/posts/posts.types';
import { TaggedPost } from '@/modules/tagged/tagged.types';
import { Highlight } from '@/modules/highlights/highlights.types';
import { CreateReelDto } from '@/modules/reels/reels.types';

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
    ),
    getAllTaggedPostsStmt: db.prepare("SELECT * FROM tagged_posts"),
    getAllHighlightsStmt: db.prepare("SELECT * FROM highlights"),
    getHighlightByIdStmt: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    createReelStmt: db.prepare(
      "INSERT INTO reels (video_url, caption) VALUES (@video_url, @caption) RETURNING *"
    ),
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: CreatePostDto) => {
      return statements.createPost.get(data);
    },
  };

  const highlights = {
    getAll: () => {
      return statements.getAllHighlightsStmt.all() as Highlight[];
    },
    getById: (id: string) => {
      return statements.getHighlightByIdStmt.get(id) as Highlight | undefined;
    },
  };

  const reels = { // NEW: Reels helper object
    create: (data: CreateReelDto) => {
      return statements.createReelStmt.get(data);
    },
    getAll: () => { // NEW: getAll method for reels
      return statements.getAllReelsStmt.all() as Reel[];
    },
  };

  return {
    posts,
    highlights,
    reels, 
  };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
    transactions: TransactionHelpers;
   
  }
}

export { createTransactionHelpers };

export async function getAllTaggedPosts(db: Database): Promise<TaggedPost[]> {
  return db.prepare('SELECT * FROM tagged_posts').all() as TaggedPost[];

}
// Export the new highlight functions
export async function getAllHighlights(db: Database): Promise<Highlight[]> {
  // Assuming 'highlights' table exists and has data matching Highlight type
  return db.prepare('SELECT * FROM highlights').all() as Highlight[];
}

export async function getHighlightById(db: Database, id: string): Promise<Highlight | undefined> {
  // Assuming 'highlights' table exists and has data matching Highlight type
  return db.prepare('SELECT * FROM highlights WHERE id = ?').get(id) as Highlight | undefined;

}