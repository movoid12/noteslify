import { relations, sql } from 'drizzle-orm';
import {
  index,
  primaryKey,
  sqliteTable,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from 'next-auth/adapters';

export const createTable = sqliteTableCreator((name) => `example-app_${name}`);

export const users = createTable('user', (d) => ({
  id: d
    .text({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text({ length: 255 }),
  email: d.text({ length: 255 }).notNull(),
  emailVerified: d.integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  image: d.text({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  'account',
  (d) => ({
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.text({ length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: d.text({ length: 255 }).notNull(),
    providerAccountId: d.text({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.text({ length: 255 }),
    scope: d.text({ length: 255 }),
    id_token: d.text(),
    session_state: d.text({ length: 255 }),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    index('account_user_id_idx').on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  (d) => ({
    sessionToken: d.text({ length: 255 }).notNull().primaryKey(),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.integer({ mode: 'timestamp' }).notNull(),
  }),
  (t) => [index('session_userId_idx').on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verification_token',
  (d) => ({
    identifier: d.text({ length: 255 }).notNull(),
    token: d.text({ length: 255 }).notNull(),
    expires: d.integer({ mode: 'timestamp' }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const topics = sqliteTable('topics', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  updatedAt: text()
    .default(sql`(CURRENT_DATE)`)
    .$onUpdate(() => sql`(CURRENT_DATE)`),
  title: text('title').notNull(),
  userId: text('userId').notNull(),
});

export const notes = sqliteTable('notes', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  updatedAt: text()
    .default(sql`(CURRENT_DATE)`)
    .$onUpdate(() => sql`(CURRENT_DATE)`),
  title: text('title').notNull(),
  content: text('content').notNull(),
  topicId: text('topicId').notNull(),
});

// Relations

export const topicsRelations = relations(topics, ({ one, many }) => ({
  user: one(users, {
    fields: [topics.userId],
    references: [users.id],
  }),
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  topic: one(topics, {
    fields: [notes.topicId],
    references: [topics.id],
  }),
}));
