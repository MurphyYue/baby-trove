"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US'

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
          "relative bg-white text-black dark:bg-black dark:text-white p-2 h-lvh",
        )}
      >
        <ConfigProvider locale={enUS}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
