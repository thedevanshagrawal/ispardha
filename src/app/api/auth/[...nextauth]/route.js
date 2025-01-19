import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connectDB";
import bcrypt from "bcrypt";
import userModel from "@/models/userModel";

export const authOptions = NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const { username, password } = credentials;

          const user = await userModel.findOne({ username });
          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.fullName,
            username: user.username,
            role: user.role,
            house: user.house || "",
            accessToken: user.accessToken || "",
          };
        } catch (error) {
          console.error("Error during login:", error.message);
          throw new Error(error.message || "Error during login");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.name;
        token.username = user.username;
        token.role = user.role;
        token.house = user.house || "";
        token.accessToken = user.accessToken || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.house = token?.house || "";
      }

      const headers = new Headers();
      headers.set("Authorization", `Bearer ${token.accessToken}`);

      session.headers = headers;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
});

export { authOptions as GET, authOptions as POST }