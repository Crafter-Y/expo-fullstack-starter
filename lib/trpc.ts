import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "./auth";

export const createContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({ headers: opts.headers });
  return { session };
};

const t = initTRPC.context<typeof createContext>().create();

// Public procedure (anyone can access)
export const publicProcedure = t.procedure;

// Protected procedure (requires authentication)
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user,
    },
  });
});

export const router = t.router;
