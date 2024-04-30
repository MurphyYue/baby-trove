"use client"
import TabBar from "@/components/TabBar";
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
      <TabBar />
      {children}
    </NextAuthProvider>
  );
}
