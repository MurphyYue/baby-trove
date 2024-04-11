'use client'

import { signOut, useSession } from "next-auth/react";

export default function User() {
  const { data: session, status } = useSession();
  console.log(session)
  return (
    <div>
      <p>
        {session?.user?.name} ({session?.user?.email})
      </p>
      <button
        type="button"
        onClick={() => signOut()}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        <a>Log out</a>
      </button>
    </div>
  );
}