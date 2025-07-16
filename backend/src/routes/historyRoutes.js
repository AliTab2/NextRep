import express from "express";
const router = express.Router();
import History from "../models/History.js";
import User from "../models/User.js";
import { sendCourseMessage } from "../utils/send.js";

router.get("/", async (_req, res) => {
  try {
    const history = await History.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name")
      .populate("course.trainer", "name");

    return res.json(history);
  } catch (err) {
    console.error("Fehler beim Abrufen der History:", err);
    return res.status(500).json({});
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name");
    return res.json(history);
  } catch (err) {
    console.error("Fehler beim Abrufen der Nutzer-History:", err);
    return res.status(500).json({});
  }
});

router.post("/", async (req, res) => {
  try {
    const { action, course, userId } = req.body;

    if (!action || !userId) return res.status(400).json({});

    if (course) {
      const trainerIds = course.trainer.map((t) => t);
      const fullTrainerObjects = trainerIds.every((t) => t._id && t._name);

      if (!fullTrainerObjects) {
        const trainers = await User.find({ _id: { $in: trainerIds } }).select(
          "name _id"
        );
        course.trainer = trainers;
      }
    }

    if (action === "login") {
      await History.findOneAndDelete(
        { userId, action: "login" },
        { sort: { createdAt: -1 } }
      );
    }
    await History.create({ action, course, userId });
    return res.status(201).json({});
  } catch (err) {
    console.error("Fehler beim Erstellen des History-Eintrags:", err);
    return res.status(500).json({});
  }
});

router.put("/", async (req, res) => {
  try {
    const notifications = req.body.notifications; // array mit Objekte [ { _id: '', message: '' } ]
    const whatsAppGroup = req.body.group; // string
    const userId = req.headers["x-user-id"];

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({});

    if (!notifications?.length || !whatsAppGroup) {
      return res.status(400).json({});
    }

    const ids = notifications.map((n) => n._id);
    const result = await History.updateMany(
      { _id: { $in: ids } },
      { $set: { sent: true } }
    );

    if (result.modifiedCount === 0) return res.status(404).json({});

    const messages = notifications.map((n) => n.message);

    sendCourseMessage(user.name, messages, whatsAppGroup);

    return res.status(200).json({});
  } catch (err) {
    console.error("Fehler beim Aktualisieren des History-Eintrags:", err);
    return res.status(500).json({});
  }
});

export default router;
