import { FastifyInstance } from 'fastify';
import { fetchTaggedPosts } from './tagged.services';
import { TaggedPostSchema } from './tagged.types';


import { z } from "zod";

// validate the array shape in one go
const taggedPostsSchema = z.array(TaggedPostSchema);

export async function taggedRoutes(fastify: FastifyInstance) {
  fastify.get("/tagged/grid", async (_req, reply) => {
    const posts = await fetchTaggedPosts(fastify);
    taggedPostsSchema.parse(posts);       // throws if shape is wrong
    return reply.send(posts);
  });
}