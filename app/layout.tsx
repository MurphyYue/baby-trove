import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "relative bg-white text-black dark:bg-black dark:text-white",
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
