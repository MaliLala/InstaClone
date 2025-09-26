import { FastifyInstance } from "fastify";
import { fetchTaggedPosts } from "./tagged.services";
import { TaggedPostSchema } from "./tagged.types";
import { z } from "zod";

const taggedPostsSchema = z.array(TaggedPostSchema);

export async function taggedRoutes(fastify: FastifyInstance) {
  fastify.get("/tagged/grid", async (_req, reply) => {
    const posts = await fetchTaggedPosts(fastify);

    // map snake_case -> camelCase for the frontend
    const mapped = posts.map((p: any) => ({
      id: p.id,
      imageUrl: p.img_url ?? p.imageUrl,
      caption: p.caption ?? null,
      taggedBy: p.tagged_by ?? p.taggedBy ?? "unknown",
      createdAt: p.created_at ?? p.createdAt,
    }));

    taggedPostsSchema.parse(mapped);
    return reply.send(mapped);
  });
}
