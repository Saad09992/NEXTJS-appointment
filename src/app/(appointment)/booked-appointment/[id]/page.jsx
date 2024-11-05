"use client";
import React from "react";
import ViewBooking from "@/components/ViewBooking";

function Page({ params }) {
  // Change the function name to 'Page'
  const { id } = params; // Directly extract 'id' from 'params'

  return (
    <div>
      <ViewBooking userId={id} />
    </div>
  );
}

export default Page; // Export the function as 'Page'
