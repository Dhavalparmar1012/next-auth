import { AuthServices } from "@/services/authuser/authuser.services";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession, type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {
          name: "email",
          label: "email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("email and password are required.");
        }

        try {
          const user = await AuthServices.loginUser({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });

          // Check if the user response is valid
          if (typeof user === "string") {
            throw new Error(user); // If it's an error message, throw it
          }

          if (user.success && user.token && user.user) {
            const { token, user: currentUserDetails } = user;
            console.log(user, "user");

            return {
              id: currentUserDetails.id,
              name: currentUserDetails.name,
              email: currentUserDetails.email,
              accessToken: token,
            } as User;
          } else {
            throw new Error(user?.error || "Invalid credentials.");
          }
        } catch (error: any) {
          throw new Error(error?.message || "Authorization failed.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user = {
          ...session.user,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!) * 1000, // Ensure it's in milliseconds
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET,
    expiresIn: "3d",
  },
  pages: {
    signIn: "/",
  },
};

export function getAuthUser( // <-- use this function to access the jwt from React components
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
