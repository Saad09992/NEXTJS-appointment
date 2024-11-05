import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return NextResponse.json(
        { message: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    return NextResponse.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
