import mongoose from "mongoose";

const ExceptionSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  release: { type: Number, required: true },
  trainer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String },
  timeInfo: {
    hour: Number,
    minute: Number,
    duration: Number,
  },
  dateInfo: {
    dayIndex: Number,
    creationWeekRange: {
      start: String,
      end: String,
    },
    recurrencePattern: String,
  },
  _id: false,
});

const CourseSchema = new mongoose.Schema(
  {
    sport: { type: String, required: true },
    release: { type: Number, required: true },
    trainer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    timeInfo: {
      hour: { type: Number, required: true },
      minute: { type: Number, default: 0 },
      duration: { type: Number, required: true },
    },
    dateInfo: {
      creationWeekRange: {
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
      dayIndex: { type: Number, required: true },
      recurrencePattern: { type: String, required: true },
      exceptions: [ExceptionSchema],
    },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
