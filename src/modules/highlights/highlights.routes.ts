import { FastifyInstance } from 'fastify';
import { HighlightSchema } from './highlights.types';
import { fetchHighlights, fetchHighlightById } from './highlights.services';
import { z } from 'zod'; // Import z for schema definition

export async function highlightsRoutes(fastify: FastifyInstance) {
  // Route to get all highlights
  fastify.get('/highlights', async (request, reply) => {
    const data = await fetchHighlights(fastify.db);
    // Validate each item in the array with the Zod schema
    data.forEach((h) => HighlightSchema.parse(h));
    return data;
  });

  // Route to get a specific highlight by ID
  fastify.get('/highlights/:id', async (request, reply) => {
    // Cast req.params to ensure TypeScript knows the shape
    const { id } = request.params as { id: string }; 
    const highlight = await fetchHighlightById(fastify.db, id);

    if (!highlight) {
      // If no highlight is found, return a 404 Not Found error
      reply.code(404).send({ message: 'Highlight not found' });
      return; // Important to return after sending a reply
    }

    // Validate the single highlight with the Zod schema
    HighlightSchema.parse(highlight);
    return highlight;
  });
}