import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  bookedSlots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule.timeSlots", // Reference to the time slot in the Schedule model
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
