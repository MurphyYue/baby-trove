import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const OPTIONS: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.SECRET,
};
