import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },

    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
