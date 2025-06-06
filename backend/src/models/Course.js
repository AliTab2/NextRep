import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  trainer: { type: String, required: true },
  time: {
    hour: { type: Number, required: true },
    minutes: { type: Number, default: 0 },
    duration: { type: Number, required: true },
  },
  date: {
    weekRange: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    weekDayName: String,
    weekDay: { type: Number, required: true },
    recurring: { type: Boolean, required: true },
    exceptions: [String],
    repeatUntil: { type: String, required: false },
  },
  status: { type: String, required: true },
  reminder: {type: Boolean, required: false, default: false},
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);
export default Course;
