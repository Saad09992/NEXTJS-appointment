"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSchedule } from "@/store/method/adminMethod";

function AdminForm() {
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [bufferTime, setBufferTime] = useState(15);
  const [appointmentDuration, setAppointmentDuration] = useState(25);
  const [date, setDate] = useState("");
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Calculate min and max dates
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // Allow scheduling up to 3 months in advance
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduleData = {
      adminId: uid,
      date,
      openingTime,
      closingTime,
      bufferTime,
      appointmentDuration,
    };
    console.log(scheduleData);
    dispatch(uploadSchedule(scheduleData));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Schedule Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold" htmlFor="date">
            Schedule Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            max={maxDateString}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Opening Time */}
        <div className="space-y-2">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="openingTime"
          >
            Opening Time
          </label>
          <input
            type="time"
            id="openingTime"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Closing Time */}
        <div className="space-y-2">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="closingTime"
          >
            Closing Time
          </label>
          <input
            type="time"
            id="closingTime"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Appointment Duration */}
        <div className="space-y-2">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="appointmentDuration"
          >
            Appointment Duration (minutes)
          </label>
          <input
            type="number"
            id="appointmentDuration"
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="5"
            required
          />
        </div>

        {/* Buffer Time */}
        <div className="space-y-2">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="bufferTime"
          >
            Buffer Time Between Appointments (minutes)
          </label>
          <input
            type="number"
            id="bufferTime"
            value={bufferTime}
            onChange={(e) => setBufferTime(parseInt(e.target.value))}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Schedule
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
