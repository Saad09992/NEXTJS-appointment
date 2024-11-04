import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Schedule from "@/models/schedule";

connectDB();

export async function GET(request, { params }) {
  try {
    const userId = params.userId;
    console.log(userId);

    // Find the user by ID
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Convert ObjectId in bookedSlots to strings
    const bookedSlotIds = user.bookedSlots.map((slot) => slot.toString());
    console.log(bookedSlotIds);

    // Find the schedule where any timeSlots' _id matches any bookedSlotId
    const schedule = await Schedule.findOne({
      "timeSlots._id": { $in: bookedSlotIds },
    });

    if (!schedule) {
      return NextResponse.json(
        { message: "No matching schedule found" },
        { status: 404 }
      );
    }

    // Find the specific slot data in the schedule's timeSlots
    const matchingSlot = schedule.timeSlots.find((slot) =>
      bookedSlotIds.includes(slot._id.toString())
    );

    if (!matchingSlot) {
      return NextResponse.json(
        { message: "No matching slot found" },
        { status: 404 }
      );
    }

    // Return the matching slot data
    console.log(matchingSlot);
    return NextResponse.json(matchingSlot, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching booking", error: error.message },
      { status: 500 }
    );
  }
}
