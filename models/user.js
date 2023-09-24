import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

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
      minlength: [6, 'password length should be greater than six character']
    },

    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

//middleware 
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

export default mongoose.model("User", userSchema);
