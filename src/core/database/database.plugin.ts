import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Database from "better-sqlite3";
import {
  createTransactionHelpers,
  type TransactionHelpers,
} from "./database.transactions";
import {TaggedPost } from '@/modules/tagged/tagged.types';


declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transactions: TransactionHelpers;
  }
}

async function databasePluginHelper(fastify: FastifyInstance) {
  const db = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  // Create a simple table for testing if it doesn't exist
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
  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (instance, done) => {
    instance.db.close();
    instance.log.info("SQLite database connection closed.");
    done();
  });

  db.prepare(`
    INSERT INTO tagged_posts (id, tagged_by, post_content)
    VALUES (?, ?, ?);
  `).run('1', 'user123', 'Great picture!');

  db.prepare(`
    INSERT INTO tagged_posts (id, tagged_by, post_content)
    VALUES (?, ?, ?);
  `).run('2', 'user456', 'Check this out!');

}


const databasePlugin = fp(databasePluginHelper);



export { databasePlugin };

