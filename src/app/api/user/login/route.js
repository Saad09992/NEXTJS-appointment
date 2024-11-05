import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { isValidToken } from "@/utils/tokenValidation";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;
    const user = await User.findOne({ username, isAdmin: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECERT, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      message: "User logged in successfully",
      uid: user._id,
      token,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
