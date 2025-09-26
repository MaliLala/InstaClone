import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postsService } from "./posts.service";
import { CreatePostDto } from "./posts.types";

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = postsService(fastify);

  // Raw list
  fastify.get("/posts", async (_request, reply) => {
    const posts = await service.getAll();
    return reply.send(posts);
  });

  // Grid endpoint expected by the frontend, with camelCase mapping
  fastify.get("/posts/grid", async (_request, reply) => {
    const rows = fastify.db
      .prepare(`
        SELECT
          id,
          img_url     AS imageUrl,
          caption,
          created_at  AS createdAt
        FROM posts
        ORDER BY created_at DESC
      `)
      .all();
    return reply.send(rows);
  });

  fastify.post<{ Body: CreatePostDto }>("/posts", async (request, reply) => {
    const newPost = await service.create(request.body);
    return reply.code(201).send(newPost);
  });
};

export { postsRoutes };
