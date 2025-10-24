import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const todoRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.todo.findMany({
      where: { userId: ctx.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id, userId: ctx.user.id },
        include: {
          category: true,
        },
      });
      if (!todo) throw new TRPCError({ code: "NOT_FOUND" });
      return todo;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().optional(),
        categoryId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.todo.create({
        data: {
          ...input,
          userId: ctx.user.id,
        },
        include: {
          category: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
        categoryId: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await prisma.todo.update({
        where: { id, userId: ctx.user.id },
        data,
        include: {
          category: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await prisma.todo.delete({
        where: { id: input.id, userId: ctx.user.id },
      });
      return { success: true };
    }),

  toggleComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id, userId: ctx.user.id },
      });
      if (!todo) throw new TRPCError({ code: "NOT_FOUND" });

      return await prisma.todo.update({
        where: { id: input.id },
        data: { completed: !todo.completed },
      });
    }),
});
