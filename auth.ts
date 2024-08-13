import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcryptjs";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: {
          label: "Role",
          type: "text",
        },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        const role = credentials.role as string | undefined;
        if (!email || !password || !role) {
          throw new CredentialsSignin("Please provide email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
            role: role as Role,
          },
        });

        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (!user.password) throw new CredentialsSignin("Invalid password");

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) throw new CredentialsSignin("Invalid password");

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
