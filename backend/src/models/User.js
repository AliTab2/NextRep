import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    billingName: { type: String, required: false },
    password: { type: String }, // nur optional, falls du Login einführen willst
    roles: { type: [String], required: true },
    courses: { type: [String], required: true }, // nur leer wenn kein "trainer"
    history: { type: [String], default: [] },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
