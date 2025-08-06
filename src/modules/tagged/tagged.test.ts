import { build } from '@/app';
import { expect, test } from 'vitest';

test('GET /tagged/grid returns an array of tagged posts', async () => {
    const app = await build();
    
    const res = await app.inject({
        method: 'GET',
        url: '/tagged/grid'
    });

    expect(res.statusCode).toBe(200);
    const data = res.json();

    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
        expect(data[0].toHaveProperty('id');
        expect(data[0].toHaveProperty('tagged_by');
        expect(data[0].toHaveProperty('post.content');
        }
});