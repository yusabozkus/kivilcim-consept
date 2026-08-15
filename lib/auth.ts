import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      birthDate: { type: "string" },
      phoneNumber: { type: "string" },
      profession: { type: "string" },
      department: { type: "string" },
      skills: { type: "string" },
      reason: { type: "string" },
      role: {
        type: "string",
        input: false,
        defaultValue: "user",
      },
      city: { type: "string" },
    },
  },
  plugins: [nextCookies()],
});
