import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { reelsService } from './reels.service';
import { CreateReelDto } from './reels.types';

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.post<{ Body: CreateReelDto }>('/reels', async (request, reply) => {
    const newReel = await service.create(request.body);
    return reply.code(201).send(newReel);
  });
};

export { reelsRoutes };