import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core'

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  hitCount: integer('hit_count').default(0).notNull(),
}, (table) => [
  index('slug_idx').on(table.slug),
])
