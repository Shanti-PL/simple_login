import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, newPassword } = await req.json();

    console.log("Received password reset request for email:", email);

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found.");
      return new NextResponse(
        { message: "User not found." },
        { status: 404 }
      );
    }

    console.log("Updating password for user with email:", email);

    // update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    console.log("Password reset successful.");

    return NextResponse.json({ message: "Password reseted."}, {status: 201});
  } catch (error) {
    console.error("An error occurred while processing the request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
