"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSchedule } from "@/store/method/adminMethod";

function AdminForm() {
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [bufferTime, setBufferTime] = useState(15);
  const [appointmentDuration, setAppointmentDuration] = useState(25);
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduleData = {
      adminId: uid,
      openingTime,
      closingTime,
      bufferTime,
      appointmentDuration,
    };
    dispatch(uploadSchedule(scheduleData));
    console.log("Schedule Data:", scheduleData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Schedule Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="openingTime"
          >
            Opening Time
          </label>
          <input
            type="time"
            id="openingTime"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="closingTime"
          >
            Closing Time
          </label>
          <input
            type="time"
            id="closingTime"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="appointmentDuration"
          >
            Appointment Duration (minutes)
          </label>
          <input
            type="number"
            id="appointmentDuration"
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(e.target.value)}
            className="w-full p-2 border rounded"
            min="5"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="bufferTime"
          >
            Buffer Time Between Appointments (minutes)
          </label>
          <input
            type="number"
            id="bufferTime"
            value={bufferTime}
            onChange={(e) => setBufferTime(e.target.value)}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
        >
          Save Schedule
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
