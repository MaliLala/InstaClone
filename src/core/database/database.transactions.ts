import type { Database } from "better-sqlite3";
import { CreatePostDto }   from "@/modules/posts/posts.types";
import { TaggedPost }      from "@/modules/tagged/tagged.types";
import {CreateHighlightDto, Highlight, } from "@/modules/highlights/highlights.types";
import { CreateReelDto, Reel } from "@/modules/reels/reels.types";

export const createTransactionHelpers = (db: Database) => {
  // 1) Prepare all statements, including the new ones
  const statements = {
    // Posts
    getPostById:        db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts:        db.prepare("SELECT * FROM posts"),
    createPost:         db.prepare(
                          "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
                        ),

    // Tagged
    getAllTaggedPosts:  db.prepare("SELECT * FROM tagged_posts"),

    // Highlights (added create)
    getAllHighlights:   db.prepare("SELECT * FROM highlights"),
    getHighlightById:   db.prepare("SELECT * FROM highlights WHERE id = ?"),
    createHighlight:    db.prepare(
                          "INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title) RETURNING *"
                        ),

    // Reels (added getById)
    createReel:         db.prepare(
                          "INSERT INTO reels (video_url, caption) VALUES (@video_url, @caption) RETURNING *"
                        ),
    getAllReels:        db.prepare("SELECT * FROM reels"),
    getReelById:        db.prepare("SELECT * FROM reels WHERE id = ?"),
  };

  // 2) Wire up resource helper objects
  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id) as CreatePostDto & { id: number };
    },
    getAll: () => {
      return statements.getAllPosts.all() as (CreatePostDto & { id: number })[];
    },
    create: (data: CreatePostDto) => {
      return statements.createPost.get(data) as CreatePostDto & { id: number };
    },
  };

  const highlights = {
    getAll: () => {
      return statements.getAllHighlights.all() as Highlight[];
    },
    getById: (id: string) => {
      return statements.getHighlightById.get(id) as Highlight | undefined;
    },
    create: (data: CreateHighlightDto) => {
      return statements.createHighlight.get(data) as Highlight;
    },
  };

  const reels = {
    create: (data: CreateReelDto) => {
      return statements.createReel.get(data) as Reel;
    },
    getAll: () => {
      return statements.getAllReels.all() as Reel[];
    },
    getById: (id: number) => {
      return statements.getReelById.get(id) as Reel | undefined;
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

// helper functions for tagged/highlights if you still need them standalone
export async function getAllTaggedPosts(db: Database): Promise<TaggedPost[]> {
  return db.prepare("SELECT * FROM tagged_posts").all() as TaggedPost[];
}

export async function getAllHighlights(db: Database): Promise<Highlight[]> {
  return db.prepare("SELECT * FROM highlights").all() as Highlight[];
}

export async function getHighlightById(
  db: Database,
  id: string
): Promise<Highlight | undefined> {
  return (
    db.prepare("SELECT * FROM highlights WHERE id = ?").get(id) as
      | Highlight
      | undefined
  );
}
