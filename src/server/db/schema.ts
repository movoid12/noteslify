import { relations, sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';


export const user = pgTable("user", {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull().default(false),
  image: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});


export const usersRelations = relations(user, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text().notNull().references(() => user.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull()
});


export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(user, { fields: [accounts.userId], references: [user.id] }),
}));

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text().notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});

export const topics = pgTable('topics', {
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

export const notes = pgTable('notes', {
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
  user: one(user, {
    fields: [topics.userId],
    references: [user.id],
  }),
  notes: many(notes),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  topic: one(topics, {
    fields: [notes.topicId],
    references: [topics.id],
  }),
}));
