"use client";
import React from "react";
import BookingForm from "../../../../components/BookingForm";

// This component will be at app/booking/[slotId]/page.jsx
function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Complete Your Booking
      </h1>
      <BookingForm />
    </div>
  );
}

export default BookingPage;
