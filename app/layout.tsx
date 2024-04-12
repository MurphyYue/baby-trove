import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import NextAuthProvider from "./NextAuthProvider"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "relative bg-white text-black dark:bg-black dark:text-white p-2",
        )}
      >
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
