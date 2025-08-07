import { FastifyInstance } from "fastify";
import type { Reel } from "./reels.types";

export async function getAllReels(fastify: FastifyInstance): Promise<Reel[]> {
  const rows = fastify.db.prepare(`SELECT * FROM posts ORDER BY created_at DESC`).all();

  return rows.map((row: any) => ({
    id: row.id,
    imageUrl: row.img_url,
    caption: row.caption,
    createdAt: row.created_at
  }));
}