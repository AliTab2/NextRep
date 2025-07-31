import User from "../models/User.js";
import Course from "../models/Course.js";
import express from "express";
import { validateCourse } from "../utils/validate.js";
import { checkRole } from "../middleware/check.js";

const router = express.Router();

// GET All COURSES
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("trainer", "name")
      .populate("dateInfo.exceptions.trainer", "name");
    return res.json(courses);
  } catch (err) {
    console.error("Fehler beim Abrufen:", err);
    return res.status(500).json({});
  }
});

// GET USER COURSES (inkl. Exceptions)
router.get("/user", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({});

    const allCourses = await Course.find().populate("trainer", "name");
    const relevant = [];

    for (const course of allCourses) {
      const isStandardTrainer = course.trainer.some(
        (t) => t._id.toString() === userId
      );

      if (isStandardTrainer) {
        relevant.push(course.toObject());
        continue;
      }

      for (const ex of course.dateInfo.exceptions || []) {
        const isExceptionTrainer = ex.trainer?.some(
          (t) => t.toString() === userId
        );
        if (isExceptionTrainer && ex.status !== "deleted") {
          relevant.push(ex);
        }
      }
    }
    return res.json(relevant);
  } catch (err) {
    console.error("Fehler beim Abrufen:", err);
    return res.status(500).json({});
  }
});

// ADD-COURSE
router.post("/", checkRole(["superadmin", "admin"]), async (req, res) => {
  const course = req.body.course;

  if (!validateCourse(course)) return res.status(400).json({});

  try {
    // for new id
    const cleanCourse = { ...course };
    delete cleanCourse._id;

    const newCourse = new Course(cleanCourse);
    await newCourse.save();

    return res.status(201).json({});
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
    res.status(500).json({});
  }
});

// UPDATE-COURSE
router.put(
  "/:courseId",
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    const updatedCourse = req.body.course;

    if (!validateCourse(updatedCourse)) return res.status(400).json({});
    try {
      updatedCourse.trainer = updatedCourse.trainer._id;

      const course = await Course.findByIdAndUpdate(
        req.params.courseId,
        updatedCourse,
        { new: true }
      );
      if (!course) return res.status(404).json({});

      return res.json(course);
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
      return res.status(500).json({});
    }
  }
);

// DELETE-COURSE
router.delete(
  "/:courseId",
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    try {
      const deleted = await Course.findByIdAndDelete(req.params.courseId);
      if (!deleted) return res.status(404).json({});

      return res.json({});
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      return res.status(500).json({});
    }
  }
);

export default router;
