import mongoose from "mongoose";

const SportSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  color: { type: String, required: false, default: "#000000" },
  icon: { type: String, required: false },
});

const Sport = mongoose.model("Sport", SportSchema);
export default Sport;
