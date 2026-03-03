import { createRoute, z } from '@hono/zod-openapi'
import { OpenAPIHono } from '@hono/zod-openapi'
import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { urls } from '../db/schema'

const SlugParamSchema = z.object({
  slug: z.string().openapi({ example: 'abc12345' }),
})

const ErrorSchema = z.object({
  error: z.string(),
})

const redirectRoute = createRoute({
  method: 'get',
  path: '/{slug}',
  request: {
    params: SlugParamSchema,
  },
  responses: {
    301: {
      description: 'Redirect to the original URL',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Slug not found',
    },
  },
})

export const redirectRouter = new OpenAPIHono()

redirectRouter.openapi(redirectRoute, async (c) => {
  const { slug } = c.req.valid('param')

  const result = await db
    .select()
    .from(urls)
    .where(eq(urls.slug, slug))
    .limit(1)

  if (result.length === 0) {
    return c.json({ error: 'Slug not found' }, 404)
  }

  // Fire-and-forget: increment hit count without blocking the redirect
  db.update(urls)
    .set({ hitCount: sql`${urls.hitCount} + 1` })
    .where(eq(urls.slug, slug))
    .execute()
    .catch(() => {}) // swallow errors — redirect is more important than the counter

  return c.redirect(result[0].originalUrl, 301)
})
