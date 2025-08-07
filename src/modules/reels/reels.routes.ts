import { type FastifyInstance } from "fastify";
import { getAllReels } from "./reels.service";
import { ReelSchema } from "./reels.types";

export async function reelsRoutes(fastify: FastifyInstance) {
  fastify.get("/reels/grid", {
    schema: {
      response: {
        200: {
          type: "array",
          items: ReelSchema
        }
      }
    }
  }, async (request, reply) => {
    const reels = await getAllReels(fastify);
    return reply.send(reels);
  });
}