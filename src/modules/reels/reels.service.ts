import type { FastifyInstance } from 'fastify';
import { CreateReelDto } from '.reels/types';

const reelsService = (fastify: FastifyInstance) => {
  return {
    create: async (reelData: CreateReelDto) => {
      fastify.log.info(`Creating a new reel`);
      const reel = fastify.transactions.reels.create(reelData);
      return reel;
    },
  };
};

export { reelsService };