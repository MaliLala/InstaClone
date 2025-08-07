import 'fastify';
import type Database from 'better-sqlite3';
import type { TransactionHelpers } from "../core/database/database.transactions";

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    transactions: TransactionHelpers;
  }
}