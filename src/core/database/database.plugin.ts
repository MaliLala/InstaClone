import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import type { Database as DatabaseType } from "better-sqlite3";
const Database = require("better-sqlite3") as new (file: string) => DatabaseType;

import {
  createTransactionHelpers,
  type TransactionHelpers,
} from "./database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    /** The Better-SQLite3 database handle */
    db: DatabaseType;
    /** A collection of helper methods for transactions */
    transactions: TransactionHelpers;
  }
}

const databasePluginHelper: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  // 1) Open DB
  const db: DatabaseType = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  // 2) Create tables (idempotent)
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
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      tagged_by TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      caption TEXT,
      views INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      cover_image_url TEXT NOT NULL
    );
  `);

  // 3) Lightweight migrations for existing DBs
  try {
    const reelsCols = db
      .prepare(`PRAGMA table_info(reels)`)
      .all() as Array<{ name: string }>;
    const have = new Set(reelsCols.map((c) => c.name));

    if (!have.has("thumbnail_url")) {
      db.exec(
        `ALTER TABLE reels ADD COLUMN thumbnail_url TEXT NOT NULL DEFAULT ''`
      );
      fastify.log.info("Migrated: added reels.thumbnail_url");
    }
    if (!have.has("views")) {
      db.exec(`ALTER TABLE reels ADD COLUMN views INTEGER NOT NULL DEFAULT 0`);
      fastify.log.info("Migrated: added reels.views");
    }
  } catch (e) {
    fastify.log.error(e, "Failed to run reels table migrations");
  }

  // 4) Seed data if empty
  const seedIfEmpty = (
    table: string,
    countQuery: string,
    seedFn: () => void
  ) => {
    const { count } = db.prepare(countQuery).get() as { count: number };
    if (count === 0) {
      const tx = (db as any).transaction(seedFn);
      tx();
      fastify.log.info(`Seeded table: ${table}`);
    }
  };

  // Highlights seed (your original)
  seedIfEmpty(
    "highlights",
    `SELECT COUNT(*) AS count FROM highlights`,
    () => {
      const insert = db.prepare(
        `INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title)`
      );
      const data = [
        {
          cover_image_url: "http://example.com/highlight1.jpg",
          title: "Vacation",
        },
        {
          cover_image_url: "http://example.com/highlight2.jpg",
          title: "Work Moments",
        },
      ];
      for (const row of data) insert.run(row);
    }
  );

  // Posts seed
  seedIfEmpty("posts", `SELECT COUNT(*) AS count FROM posts`, () => {
    const insert = db.prepare(
      `INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption)`
    );
    const data = [
      {
        img_url: "https://picsum.photos/seed/insta1/800",
        caption: "First post",
      },
      {
        img_url: "https://picsum.photos/seed/insta2/800",
        caption: "Another day, another pic",
      },
      { img_url: "https://picsum.photos/seed/insta3/800", caption: null },
    ];
    for (const row of data) insert.run(row);
  });

  // Tagged posts seed
  seedIfEmpty(
    "tagged_posts",
    `SELECT COUNT(*) AS count FROM tagged_posts`,
    () => {
      const insert = db.prepare(
        `INSERT INTO tagged_posts (img_url, caption, tagged_by) VALUES (@img_url, @caption, @tagged_by)`
      );
      const data = [
        {
          img_url: "https://picsum.photos/seed/tag1/800",
          caption: "Tagged by Alice",
          tagged_by: "alice",
        },
        {
          img_url: "https://picsum.photos/seed/tag2/800",
          caption: null,
          tagged_by: "bob",
        },
        {
          img_url: "https://picsum.photos/seed/tag3/800",
          caption: "We were here!",
          tagged_by: "charlie",
        },
      ];
      for (const row of data) insert.run(row);
    }
  );

  // Reels seed
  seedIfEmpty("reels", `SELECT COUNT(*) AS count FROM reels`, () => {
    const insert = db.prepare(
      `INSERT INTO reels (video_url, thumbnail_url, caption, views)
       VALUES (@video_url, @thumbnail_url, @caption, @views)`
    );
    const data = [
      {
        video_url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail_url: "https://picsum.photos/seed/reel1/800/450",
        caption: "Bunny!",
        views: 123,
      },
      {
        video_url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnail_url: "https://picsum.photos/seed/reel2/800/450",
        caption: "Nature shot",
        views: 456,
      },
    ];
    for (const row of data) insert.run(row);
  });

  // 5) Decorate Fastify
  const transactions = createTransactionHelpers(db);
  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (instance, done) => {
    instance.db.close();
    instance.log.info("SQLite database connection closed.");
    done();
  });
};

export const databasePlugin = fp(databasePluginHelper);
