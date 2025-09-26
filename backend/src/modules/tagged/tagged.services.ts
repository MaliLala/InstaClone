import type { FastifyInstance } from "fastify";
import { TaggedPost } from './tagged.types';
import { Highlight } from '../highlights/highlights.types';
import { getAllTaggedPosts, getHighlightById,} from '@/core/database/database.transactions';

export async function fetchTaggedPosts( fastify: FastifyInstance): Promise<TaggedPost[]> {
  return await getAllTaggedPosts(fastify.db);
}

export async function fetchHighlightById(fastify: FastifyInstance,id: string): Promise<Highlight | undefined> {
  return await getHighlightById(fastify.db, id);
}