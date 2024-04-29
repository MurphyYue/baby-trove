import NextAuth from "next-auth";
import { OPTIONS } from './option'

const authHandler = NextAuth(OPTIONS);
export { authHandler as GET, authHandler as POST };

