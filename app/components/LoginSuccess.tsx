"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginSuccess() {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-16 sm:mb-20">WELCOME</h1>
      <h2 className="text-xl sm:text-2xl mt-8 sm:mt-10 text-center font-semibold">
        Name: <span className="font-bold">{session?.user?.name}</span>
      </h2>
      <h2 className="text-xl sm:text-2xl mt-8 sm:mt-10 text-center font-semibold">
        Email: <span className="font-bold">{session?.user?.email}</span>
      </h2>

      <button onClick={() => signOut()} className="w-full mt-16 sm:mt-20">
        Log Out
      </button>
    </>
  );
}
