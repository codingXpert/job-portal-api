import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

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
      minlength: [6, 'password length should be greater than six character'],
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
  if(!this.isModified) return // isModified is an inbuilt keyword(if the password is modified return & don't save the updated data)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

// JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

//compare password
userSchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
}

export default mongoose.model("User", userSchema);
