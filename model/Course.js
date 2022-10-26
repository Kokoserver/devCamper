import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a course title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a course description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add a course weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a course tuition cost"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  minimumSkill: {
    type: String,
    required: [
      true,
      "Please add a minimum skills: example beginner, intermediate, advanced",
    ],
    enum: ["beginner", "intermediate", "advanced"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: [true, "Please add a bootcamp"],
  },
});

export default mongoose.model("Course", CourseSchema);
