import Fastify from "fastify";
import { databasePlugin } from '../../core/database/database.plugin';
import { highlightsRoutes } from './highlights.routes';
import { expect, test } from '@jest/globals';

test('GET /highlights returns all highlights', async () => {
  const app = Fastify();
  await app.register(databasePlugin);
  await app.register(highlightsRoutes);

  const res = await app.inject({
    method: 'GET',
    url: '/highlights'
  });

  expect(res.statusCode).toBe(200);
  const data = res.json();

  expect(Array.isArray(data)).toBe(true);
  if (data.length > 0) {
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('cover_image_url');
    expect(data[0]).toHaveProperty('title');
  }
});

test('GET /highlights/:id returns a specific highlight', async () => {
  const app = Fastify();
  await app.register(databasePlugin);
  await app.register(highlightsRoutes);

  const res = await app.inject({
    method: 'GET',
    url: '/highlights/1'
  });

  expect(res.statusCode).toBe(200);
  const data = res.json();

  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('title');
});