import { connectDB } from "@/app/dbconfig/config";
import { NextResponse } from "next/server";
import Schedule from "@/models/schedule";

// Connect to the database
connectDB();

function addMinutesToTime(time, minutes) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0);
  date.setMinutes(date.getMinutes() + minutes);

  // Format the new time in HH:MM format
  const newHour = date.getHours().toString().padStart(2, "0");
  const newMinute = date.getMinutes().toString().padStart(2, "0");
  return `${newHour}:${newMinute}`;
}

// Function to generate time slots
function generateTimeSlots(
  openingTime,
  closingTime,
  appointmentDuration,
  bufferTime
) {
  const slots = [];
  let currentTime = openingTime;

  while (currentTime < closingTime) {
    const endTime = addMinutesToTime(currentTime, appointmentDuration);

    if (endTime > closingTime) break; // Ensure end time does not exceed closing time

    slots.push({
      startTime: currentTime,
      endTime: endTime,
      isAvailable: true, // All slots start as available
    });

    // Move to the next time slot, adding the buffer time
    currentTime = addMinutesToTime(endTime, bufferTime);
  }

  return slots;
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      adminId,
      openingTime,
      closingTime,
      bufferTime,
      appointmentDuration,
    } = reqBody;

    if (
      !adminId ||
      !openingTime ||
      !closingTime ||
      !bufferTime ||
      !appointmentDuration
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate time slots
    const timeSlots = generateTimeSlots(
      openingTime,
      closingTime,
      appointmentDuration,
      bufferTime
    );

    // Create a new schedule document with the generated time slots
    const schedule = new Schedule({
      adminId,
      openingTime,
      closingTime,
      bufferTime,
      appointmentDuration,
      timeSlots,
    });

    // Save the schedule to the database
    await schedule.save();

    return NextResponse.json({
      message: "Schedule created successfully with time slots",
      schedule,
    });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { message: "Error creating schedule" },
      { status: 500 }
    );
  }
}
