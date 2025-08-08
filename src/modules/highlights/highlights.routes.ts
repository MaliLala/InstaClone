import { FastifyInstance } from "fastify";
import { HighlightSchema } from "./highlights.types";
import { fetchHighlights, fetchHighlightById } from "./highlights.services";

export async function highlightsRoutes(fastify: FastifyInstance) {
  fastify.get("/highlights", async (_request, reply) => {
    const data = await fetchHighlights(fastify.db);
    const mapped = data.map((h: any) => ({
      ...h,
      id: String(h.id),
    }));
    mapped.forEach((h) => HighlightSchema.parse(h));
    return mapped;
  });

  fastify.get("/highlights/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const raw = await fetchHighlightById(fastify.db, id);
    if (!raw) {
      reply.code(404).send({ message: "Highlight not found" });
      return;
    }
    const highlight = { ...raw, id: String(raw.id) };
    HighlightSchema.parse(highlight);
    return highlight;
  });
}
