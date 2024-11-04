"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSlots } from "@/store/method/bookingMethod";
import { useRouter } from "next/navigation";
import BookingForm from "../components/BookingForm";

const SlotBooking = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state.booking);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        await dispatch(getSlots());
      } catch (err) {
        setError(err.message || "Error fetching slots");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [dispatch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const slotsArray = data[0];
      if (Array.isArray(slotsArray)) {
        setSlots(slotsArray);
      }
    }
  }, [data]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleSlotClick = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
      router.push(`/booking/${slot._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>
    );
  }

  if (!slots.length) {
    return (
      <div className="p-4 mb-4 text-gray-700 bg-gray-100 rounded-lg">
        No slots available at this time
      </div>
    );
  }

  return (
    <div className="p-4">
      {!showBookingForm ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Select a Time Slot</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  slot.isAvailable
                    ? "bg-green-50 hover:bg-green-100 border-green-200"
                    : "bg-gray-50 border-gray-200"
                } ${
                  selectedSlot?._id === slot._id
                    ? "border-2 border-blue-500"
                    : "border"
                }`}
                onClick={() => handleSlotClick(slot)}
              >
                <h2 className="text-lg font-medium">
                  {`${formatTime(slot.startTime)} - ${formatTime(
                    slot.endTime
                  )}`}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    slot.isAvailable ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {slot.isAvailable ? "Available" : "Booked"}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <BookingForm
          slot={selectedSlot}
          onBack={() => setShowBookingForm(false)}
          formatTime={formatTime}
        />
      )}
    </div>
  );
};

export default SlotBooking;
