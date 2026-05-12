import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true, // For our specific use case, anyone registered is an admin.
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
