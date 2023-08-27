"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold">WELCOME</h1>
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">BACK</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-sm sm:text-base"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your Password"
        />
        <Link
          href={"/forgetPassword"}
          className="hover:underline hover:cursor-pointer"
        >
          Forgot your password?
        </Link>
        <button>
          Log&nbsp;&nbsp;In&nbsp;
          <Image
            src="/button-arrow.svg"
            alt="Arrow Icon"
            className="h-4 w-4 ml-1 my-auto"
            width={10}
            height={10}
          />
        </button>

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <p className="text-center mt-8 sm:mt-10">
          Don&apos;t have an account?&nbsp;
          <Link
            href={"/register"}
            className="hover:underline hover:cursor-pointer font-bold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}
