import { expo } from "@better-auth/expo";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: ["expofullstackstarter://"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
});
