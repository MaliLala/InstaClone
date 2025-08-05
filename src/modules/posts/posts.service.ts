import type { FastifyInstance } from "fastify";
import { CreatePostDto } from "./posts.types";

const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreatePostDto) => {
      fastify.log.info(`Creating a new post`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const post = fastify.transactions.posts.create(postData);
      return post;
    },
    getAll: async () => {
      fastify.log.info(`Getting all posts`);
      const posts = fastify.transactions.posts.getAll(); // this should be defined in your mock or real service
      return posts;
    },
  };
};


export { postsService };