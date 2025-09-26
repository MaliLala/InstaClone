import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { CreateReelDto } from "./reels.types";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.post<{ Body: CreateReelDto }>("/reels", async (request, reply) => {
    const newReel = await service.create(request.body);
    return reply.code(201).send(newReel);
  });

  // Grid endpoint expected by the frontend (map to camelCase)
  fastify.get("/reels/grid", async (_request, reply) => {
    const rows = fastify.db
      .prepare(`
        SELECT
          id,
          video_url      AS videoUrl,
          thumbnail_url  AS thumbnailUrl,
          caption,
          views,
          created_at     AS createdAt
        FROM reels
        ORDER BY created_at DESC
      `)
      .all();
    return reply.send(rows);
  });

  // Keep plain list as well
  fastify.get("/reels", async (_request, reply) => {
    const rows = fastify.db
      .prepare(`
        SELECT
          id,
          video_url      AS videoUrl,
          thumbnail_url  AS thumbnailUrl,
          caption,
          views,
          created_at     AS createdAt
        FROM reels
        ORDER BY created_at DESC
      `)
      .all();
    return reply.send(rows);
  });
};

export { reelsRoutes };
