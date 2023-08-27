import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold">WELCOME</h1>
      <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">BACK</h2>

      {/* Form */}
      <form className="flex flex-col gap-3 text-sm sm:text-base">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <p className="hover:underline hover:cursor-pointer">
          Forgot your password?
        </p>
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
        <div className="bg-red-500 text-white py-1 px-3 rounded-md mt-2">
          Error Message
        </div>

        <p className="text-center mt-8 sm:mt-10">
          Don&apos;t have an account?{" "}
          <Link
            href={"/register"}
            className="hover:underline hover:cursor-pointer font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}
