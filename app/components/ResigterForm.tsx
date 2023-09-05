"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <>
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold">REGISTER</h1>
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
        YOUR ACCOUNT
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-sm sm:text-base"
      >
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div className="relative w-full mt-6 sm:mt-8">
          <button>
            Register&nbsp;
            <Image
              src="/button-arrow.svg"
              alt="Arrow Icon"
              className="h-4 w-4 ml-1 my-auto"
              width={10}
              height={10}
            />
          </button>
          <div className="absolute inset-0 bg-black opacity-100 z-0" />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500 text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <p className="text-center mt-4 sm:mt-10">
          Already have an account?&nbsp;
          <Link
            href={"/"}
            className="hover:underline hover:cursor-pointer font-semibold"
          >
            Log&nbsp;in
          </Link>
        </p>
      </form>
    </>
  );
}
