import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

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
  advanced: {
    disableOriginCheck: process.env.NODE_ENV === "development",
  },
});
