"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { AiOutlinePlus } from "react-icons/ai";

export default function Navbar() {
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed bottom-0 left-1/2 h-[2.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:bottom-6 sm:h-[2.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className="flex fixed bottom-[0.15rem] left-1/2 h-8 -translate-x-1/2 py-2 sm:bottom-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-around gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          <motion.li
            className="h-3/4 flex items-center justify-center relative"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link
              className={clsx(
                "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
              )}
              href="/"
            >
              <span className="dark:text-white">home</span>
            </Link>
          </motion.li>
          <motion.li
            className="h-3/4 flex items-center justify-center relative"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link
              className={clsx(
                "flex w-8 h-8 rounded-full bg-orange-600 bg-opacity-70 z-[999] justify-center items-center",
              )}
              href="create-post"
            >
              <AiOutlinePlus className="text-white" />
            </Link>
          </motion.li>
          <motion.li
            className="h-3/4 flex items-center justify-center relative"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link
              className={clsx(
                "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
              )}
              href="create-post"
            >
              <span className="dark:text-white">user</span>
            </Link>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
}
