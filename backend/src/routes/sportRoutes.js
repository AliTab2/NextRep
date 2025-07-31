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
  const sport = req.body.sport;
  const color = req.body.color;
  try {
    const found = await Sport.findOne({ sport });
    if (found) return res.status(409).json({ message: "Sportart vorhanden" });

    const newSport = new Sport({ sport, color });
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
    const newSport = req.body.sport;
    const color = req.body.color;
    try {
      const sport = await Sport.findByIdAndUpdate(
        req.params.sportId,
        { sport: newSport, color },
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
