import { router } from "../trpc";
import { categoryRouter } from "./category";
import { todoRouter } from "./todo";

export const appRouter = router({
  todo: todoRouter,
  category: categoryRouter,
  // Add more routers here as needed
});

export type AppRouter = typeof appRouter;
