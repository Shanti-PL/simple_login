import "./globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import Image from "next/image";
import { AuthProvider } from "./Provider";

// const inter = Inter({ subsets: ["latin"] });
const space_mono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Coding Assignment",
  description: "A simple login system for investor hub intern",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={space_mono.className}>
        <div className="flex flex-col lg:flex-row">
          {/* The left part on large size and botton part on small size contain form */}
          <div className="w-full lg:w-[65%] h-screen">
            {/* The block to contain form */}
            <div className="grid place-items-center h-screen relative">
              <div className="mx-auto lg:m-auto px-10 md:px-12 py-12 md:py-16 w-[80%] md:w-[60%] lg:w-[50%] h-[70%] z-10 bg-white border border-black">
                <AuthProvider>{children}</AuthProvider>
              </div>
              <div className="absolute left-[13%] top-[17%] sm:left-[14%] sm:top-[19%] md:left-[21.5%] md:top-[17%] lg:left-[27%] lg:top-[17%] w-[80%] md:w-[60%] lg:w-[50%] h-[70%] bg-primaryYellow border border-black"></div>
            </div>
          </div>
          {/* The right part contain image only display on large size*/}
          <div className="hidden lg:block lg:w-[35%] h-screen relative">
            <Image
              src="/bg-image1.png"
              alt="background image"
              className="object-cover"
              layout="fill"
            ></Image>
          </div>
        </div>
      </body>
    </html>
  );
}
