import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Book an Appointment
      </h1>
      <h2 className="text-lg text-center text-gray-700 mb-4">
        Navigate to the <strong>Book Appointment</strong> tab or click this link
        to open the booking page{" "}
        <Link href="/booking" className="text-blue-600 hover:underline">
          here
        </Link>
        .
      </h2>
      <h2 className="text-md text-center text-gray-600 mb-4">
        <strong>NOTE:</strong> Normal users don't have to log in to book an
        appointment.
      </h2>
      <h1 className="text-2xl font-semibold text-center text-red-600">
        Only Admins can log in to create a schedule.
      </h1>
    </div>
  );
}
