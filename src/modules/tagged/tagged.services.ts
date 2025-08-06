import { getAllTaggedPosts } from '@/core/database/database.transactions';
import { TaggedPost } from './tagged.types';

export async function fetchTaggedPosts(db): Promise<TaggedPost[]> {
  return await getAllTaggedPosts(db);
}