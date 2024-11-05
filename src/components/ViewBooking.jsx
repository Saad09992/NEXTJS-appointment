import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooking } from "@/store/method/bookingMethod";

function ViewBooking({ userId }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);

  useEffect(() => {
    if (userId != null) {
      dispatch(getUserBooking(userId));
    }
  }, [dispatch, userId]);

  // Format time (HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return "Not available";
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Booking Details</h1>
          </div>

          {/* Content */}
          {data && data.slots ? (
            <div className="divide-y divide-gray-200">
              {/* Booking ID Section */}
              <div className="px-6 py-5 space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Booking Reference
                </p>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {data.slots._id}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {data.slots.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>
              </div>

              {/* Date Section */}
              <div className="px-6 py-5 space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Appointment Date
                </p>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-base font-medium text-gray-900">
                    {formatDate(data.date)}
                  </p>
                </div>
              </div>

              {/* Time Slot Section */}
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Time */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Start Time
                    </p>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-base font-medium text-gray-900">
                        {formatTime(data.slots.startTime)}
                      </p>
                    </div>
                  </div>

                  {/* End Time */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      End Time
                    </p>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-base font-medium text-gray-900">
                        {formatTime(data.slots.endTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot ID Section */}
              <div className="px-6 py-5">
                <p className="text-sm font-medium text-gray-500">Slot ID</p>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md font-mono">
                  {data.slots._id || "Not available"}
                </p>
              </div>

              {/* Additional Info or Actions */}
              <div className="px-6 py-5 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        data.slots.isAvailable
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-500">
                      {data.slots.isAvailable
                        ? "Slot Available"
                        : "Booking Confirmed"}
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Download Details
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No Booking found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBooking;
