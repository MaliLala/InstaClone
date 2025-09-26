import { getAllHighlights, getHighlightById } from '@/core/database/database.transactions';
import { Highlight } from './highlights.types';
import type { Database } from "better-sqlite3";

/**
 * Fetches all highlights from the database.
 * @param db The database instance.
 * @returns A promise that resolves to an array of Highlight objects.
 */
export async function fetchHighlights(db: Database): Promise<Highlight[]> {
  return await getAllHighlights(db);
}

/**
 * Fetches a single highlight by its ID from the database.
 * @param db The database instance.
 * @param id The ID of the highlight to fetch.
 * @returns A promise that resolves to a Highlight object or undefined if not found.
 */
export async function fetchHighlightById(db: Database, id: string): Promise<Highlight | undefined> {
  return await getHighlightById(db, id);
}