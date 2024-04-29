'use client'

import { signOut, signIn,  useSession } from "next-auth/react";
import Image from "next/image";

export default function User() {
  const { data: session, status } = useSession();
  console.log("session", session);
  return session ? (
    <div className="flex items-center flex-col">
      <Image
        className="rounded-full m-2"
        src={session.user?.image || ""}
        width={80}
        height={80}
        alt="avatar image"
      />
      <div>{session?.user?.name}</div>
      <div className="text-slate-500 mb-2">{session?.user?.email}</div>
      <button
        type="button"
        onClick={() => signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`
        })}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        <a>Sign out</a>
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => signIn()}
      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
    >
      <a>Sign in</a>
    </button>
  );
}