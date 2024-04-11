import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const OPTIONS = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
};
const authHandler = NextAuth(OPTIONS);
export { authHandler as GET, authHandler as POST };

