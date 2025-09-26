import Fastify from "fastify";
import cors from "@fastify/cors";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

const fastify = Fastify({ logger: true });

// Allow the frontend (Vite/React) to call the API during dev
fastify.register(cors, { origin: true });

// DB plugin
fastify.register(databasePlugin);

// Feature routes
fastify.register(postsRoutes);
fastify.register(reelsRoutes);
fastify.register(highlightsRoutes);
fastify.register(taggedRoutes);

// Health check
fastify.get("/", (_req, reply) => {
  reply.send({ hello: "world" });
});

const port = 3000;
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
