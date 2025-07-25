import exrpess from "express";
const router = exrpess.Router();
import Sport from "../models/Sport.js";
import { checkRole } from "../middleware/check.js";

// GET SPORTS
router.get("/", async (_req, res) => {
  try {
    const sports = await Sport.find();
    return res.json(sports);
  } catch (err) {
    console.error("Fehler beim Abrufen:", err);
    return res.status(500).json({});
  }
});

// ADD SPORT
router.post("/", checkRole(["superadmin", "admin"]), async (req, res) => {
  const sportObj = req.body.sport;
  try {
    const cleanSport = { ...sportObj };
    delete cleanSport._id;
    const newSport = new Sport(cleanSport);
    await newSport.save();
    return res.status(201).json({});
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
    res.status(500).json({});
  }
});

// UPDATE SPORT
router.put(
  "/:sportId",
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    const updatedSport = req.body.sport;
    try {
      const sport = await Sport.findByIdAndUpdate(
        req.params.sportId,
        updatedSport,
        { new: true }
      );
      if (!sport) return res.status(404).json({});
      return res.json(sport);
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      return res.status(500).json({});
    }
  }
);

// DELETE SPORT
router.delete(
  "/:sportId",
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    try {
      const deleted = await Sport.findByIdAndDelete(req.params.sportId);
      if (!deleted) return res.status(404).json({});
      return res.json({});
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      return res.status(500).json({});
    }
  }
);

export default router;
