import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    course: {
      type: Object,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", HistorySchema);
export default History;
