import type { FastifyInstance } from 'fastify';
import { CreateReelDto } from './reels.types';

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

export async function getAllReels(fastify: FastifyInstance) {
  const rows = fastify.db.prepare("SELECT * FROM reels ORDER BY created_at DESC").all();
  return rows;
}

