import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { protectedProcedure, router } from "../trpc";

export const categoryRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.category.findMany({
      where: { userId: ctx.user.id },
      orderBy: { name: "asc" },
      select: {
        name: true,
        id: true,
        color: true,
        icon: true,
        _count: {
          select: { todos: true },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await prisma.category.findFirst({
        where: { id: input.id, userId: ctx.user.id },
        include: {
          _count: {
            select: { todos: true },
          },
        },
      });
      if (!category) throw new TRPCError({ code: "NOT_FOUND" });
      return category;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        color: z.string().max(20).optional(),
        icon: z.string().max(50).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if category with same name already exists for this user
      const existing = await prisma.category.findFirst({
        where: {
          userId: ctx.user.id,
          name: input.name,
        },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A category with this name already exists",
        });
      }

      return await prisma.category.create({
        data: {
          ...input,
          userId: ctx.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        color: z.string().max(20).optional(),
        icon: z.string().max(50).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Verify ownership
      const category = await prisma.category.findFirst({
        where: { id, userId: ctx.user.id },
      });

      if (!category) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Check for name conflicts if name is being updated
      if (data.name && data.name !== category.name) {
        const existing = await prisma.category.findFirst({
          where: {
            userId: ctx.user.id,
            name: data.name,
          },
        });

        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A category with this name already exists",
          });
        }
      }

      return await prisma.category.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const category = await prisma.category.findFirst({
        where: { id: input.id, userId: ctx.user.id },
      });

      if (!category) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await prisma.category.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
