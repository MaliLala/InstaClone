import { FastifyInstance } from 'fastify';
import { fetchTaggedPosts } from './tagged.service';
import { TaggedPostSchema } from './tagged.types';

export async function taggedRoutes(fastify: FastifyInstance) {
  fastify.get('/tagged/grid', async (request, reply) => {
    const posts = await fetchTaggedPosts(fastify.db);
    // Use Zod to validate each item before sending
    posts.forEach((p) => TaggedPostSchema.parse(p));
    return posts;
  });
}