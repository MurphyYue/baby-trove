"use client"
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/lib/NextAuthProvider"


export default function Layout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <NextAuthProvider>
      <Navbar />
      {children}
    </NextAuthProvider>
  );
}
