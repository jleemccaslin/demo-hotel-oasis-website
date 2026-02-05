import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

declare module "next-auth" {
  // Avoids Next Auth v5 beta + TS errors
  interface Session {
    user: {
      guestID: string;
    } & DefaultSession["user"];
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: ({ auth, request }) => {
      const { pathname } = request.nextUrl;

      if (auth?.user && pathname.startsWith("/login")) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (user.email === undefined || user.email === null) return false;

        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);

      session.user.guestID = guest.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const { GET, POST } = handlers;
