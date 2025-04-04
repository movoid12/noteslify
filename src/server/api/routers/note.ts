import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { notes } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export const noteRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.db
        .delete(notes)
        .where(eq(notes.id, input.id))
        .returning();
      return deleted[0];
    }),
  create: protectedProcedure
    .input(
      z.object({ topicId: z.string(), title: z.string(), content: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const inserted = await ctx.db
        .insert(notes)
        .values({
          title: input.title,
          content: input.content,
          topicId: input.topicId,
        })
        .returning();
      return inserted[0];
    }),
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allNotes = await ctx.db
        .select()
        .from(notes)
        .where(eq(notes.topicId, input.topicId));
      return allNotes;
    }),
  get: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [note] = await ctx.db
        .select()
        .from(notes)
        .where(eq(notes.id, input.noteId));
      return note;
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db
        .update(notes)
        .set({ title: input.title, content: input.content })
        .where(eq(notes.id, input.id))
        .returning();
      return updated[0];
    }),
});
