import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
    getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.note.findMany({
            where: {
                topicId: input.topicId,
            },
        });
    }
    ),
});