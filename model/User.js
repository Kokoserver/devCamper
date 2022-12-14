import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxlength: [30, "user name must be at least 30 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
    required: [true, "email is required"],
  },
  role: {
    type: String,
    enum: {
      values: ["user", "publisher"],
      message: "please enter a  valid role",
    },

    default: "user",
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password must be at least 6 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypt user password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignedJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};
UserSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", UserSchema);
