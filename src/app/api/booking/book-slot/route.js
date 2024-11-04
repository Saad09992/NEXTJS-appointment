import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import Schedule from "@/models/schedule";
import User from "@/models/user";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { slotId, name, email } = reqBody;
    console.log("Received booking request:", reqBody);

    // Find the schedule document and the specific time slot using $elemMatch
    const schedule = await Schedule.findOne({
      "timeSlots._id": slotId,
    });

    if (!schedule) {
      return NextResponse.json(
        { message: "Schedule not found" },
        { status: 404 }
      );
    }

    // Find the specific slot in the timeSlots array
    const slot = schedule.timeSlots.id(slotId);

    if (!slot) {
      return NextResponse.json({ message: "Slot not found" }, { status: 404 });
    }

    if (!slot.isAvailable) {
      return NextResponse.json(
        { message: "Slot is already booked" },
        { status: 400 }
      );
    }

    // Update the specific slot using MongoDB's $ positional operator
    await Schedule.updateOne(
      { "timeSlots._id": slotId },
      {
        $set: {
          "timeSlots.$.isAvailable": false,
        },
      }
    );

    // Create new user with booking reference
    const user = new User({
      username: name,
      email: email,
      bookedSlots: [slotId],
    });
    await user.save();

    return NextResponse.json(
      {
        message: "Slot booked successfully",
        bookingId: user._id,
        status: "OK",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "Error booking slot", error: error.message },
      { status: 500 }
    );
  }
}
