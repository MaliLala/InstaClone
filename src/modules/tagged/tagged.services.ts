import { TaggedPost } from './tagged.types';
import { Highlight } from '../highlights/highlights.types';
import { getAllTaggedPosts, getHighlightById,} from '@/core/database/database.transactions';

export async function fetchTaggedPosts(db): Promise<TaggedPost[]> {
  return await getAllTaggedPosts(db);
}

export async function fetchHighlightById(db, id: string): Promise<Highlight | undefined> {
  return await getHighlightById(db, id);
}