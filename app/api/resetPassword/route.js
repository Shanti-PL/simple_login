import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    const { email, password } = await req.json();

    console.log("Received password reset request for email:", email);
    const hashedPassword = await bcrypt.hash(password, 10);
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
    await User.updateOne({ email }, { $set: { password: hashedPassword } });


    return NextResponse.json({ message: "Password reseted."}, {status: 201});
  } catch (error) {
    console.error("An error occurred while processing the request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
