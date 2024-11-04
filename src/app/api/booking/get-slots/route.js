import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import Schedule from "@/models/schedule";

connectDB();

export async function GET() {
  try {
    // Fetch the schedule data from the database
    const schedules = await Schedule.find();

    // Extract only the timeSlots from each schedule
    const timeSlotsArray = schedules.map((schedule) => schedule.timeSlots);

    return NextResponse.json({ data: timeSlotsArray });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching slots" });
  }
}
