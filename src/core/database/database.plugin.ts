import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
// This import is for the type information used in the interface
import type { Database as DatabaseType } from 'better-sqlite3';
// This is a dynamic import that brings in the constructor function
const Database = require('better-sqlite3');
import {
  createTransactionHelpers,
  type TransactionHelpers,
} from './database.transactions';
import { TaggedPost } from '@/modules/tagged/tagged.types';

declare module 'fastify' {
  interface FastifyInstance {
    /** The Better-SQLite3 database handle */
    db: DatabaseType; // Correctly using the imported type
    /** A collection of helper methods for transactions */
    transactions: TransactionHelpers;
  }
}

/**
 * Fastify plugin that
 * 1. Opens a SQLite DB,
 * 2. Ensures tables exist (posts, tagged_posts, reels, highlights),
 * 3. Seeds some sample data,
 * 4. Exposes `fastify.db` and `fastify.transactions`,
 * 5. Closes the DB on server shutdown.
 */
async function databasePluginHelper(fastify: FastifyInstance) {
  // 1) open or create the database file
  // Now this works because Database is the constructor from the require statement
  const db = new Database('./database.db');
  fastify.log.info('SQLite database connection established.');

  // 2) ensure all your tables exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id TEXT PRIMARY KEY,
      tagged_by TEXT NOT NULL,
      post_content TEXT NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS highlights (
      id TEXT PRIMARY KEY,
      cover_image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3) wire up your transaction helpers
  const transactions = createTransactionHelpers(db);

  // 4) decorate Fastify with them
  fastify.decorate('db', db);
  fastify.decorate('transactions', transactions);

  // 5) make sure to close it on shutdown
  fastify.addHook('onClose', (instance, done) => {
    instance.db.close();
    instance.log.info('SQLite database connection closed.');
    done();
  });

  // 6) optional: seed a couple of tagged_posts
  db.prepare(
    `INSERT OR IGNORE INTO tagged_posts (id, tagged_by, post_content) VALUES (?, ?, ?);`
  )
    .run('1', 'user123', 'Great picture!');
  db.prepare(
    `INSERT OR IGNORE INTO tagged_posts (id, tagged_by, post_content) VALUES (?, ?, ?);`
  )
    .run('2', 'user456', 'Check this out!');
}

export const databasePlugin = fp(databasePluginHelper);