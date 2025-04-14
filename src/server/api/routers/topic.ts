import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { topics } from '~/server/db/schema';
import { createTRPCRouter, protectedProcedure } from '../trpc';
// Adjust the import to your schema file

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Retrieve topics for the current user
    return await ctx.db
      .select()
      .from(topics)
      .where(eq(topics.userId, ctx.session.user.id));
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Insert new topic and return the created row
      const result = await ctx.db
        .insert(topics)
        .values({
          title: input.title,
          userId: ctx.session.user.id,
        })
        .returning();
      return result[0];
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete topic by id and return the deleted row
      const result = await ctx.db
        .delete(topics)
        .where(eq(topics.id, input.id))
        .returning();
      return result[0];
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Update topic's title by id and return the updated row
      const result = await ctx.db
        .update(topics)
        .set({ title: input.title })
        .where(eq(topics.id, input.id))
        .returning();
      return result[0];
    }),
});
