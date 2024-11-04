const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Admin model
    required: true,
  },
  openingTime: {
    type: String, // Store as a string in HH:MM format
    required: true,
  },
  closingTime: {
    type: String, // Store as a string in HH:MM format
    required: true,
  },
  bufferTime: {
    type: Number, // Buffer time in minutes between appointments
    required: true,
  },
  appointmentDuration: {
    type: Number, // Duration of each appointment in minutes
    required: true,
  },
  timeSlots: [
    {
      startTime: {
        type: String, // Store start time as a string in HH:MM format
        required: true,
      },
      endTime: {
        type: String, // Store end time as a string in HH:MM format
        required: true,
      },
      bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
