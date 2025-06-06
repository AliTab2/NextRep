import User from '../models/User.js'
import { sendCourseMessage } from '../utils/send.js'
import express from 'express'
import Course from '../models/Course.js'
import { validateCourse } from '../utils/validate.js'
import { checkRole, checkCooldown } from '../middleware/check.js'

const router = express.Router()

// get courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
    return res.json(courses)
  } catch (err) {
    console.error('Fehler beim Abrufen:', err)
    return res.status(500).json({})
  }
})

// add course
router.post('/', checkRole(['superadmin', 'admin']), checkCooldown, async (req, res) => {
  const course = req.body.course
  const msg = req.body.msg
  const userId = req.headers['x-user-id']

  if (!validateCourse(course)) return res.status(400).json({})

  try {
    // for new id
    const cleanCourse = { ...course }
    delete cleanCourse._id

    const newCourse = new Course(cleanCourse)
    await newCourse.save()

    // WhatsApp Auto-Msg
    const user = await User.findById(userId)
    if (!user) return res.status(401).json({})
    if (msg) await sendCourseMessage(user.name, msg)

    return res.status(201).json({})
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    res.status(500).json({})
  }
})


// update course
router.put('/:id', checkRole(['superadmin', 'admin']), async (req, res) => {
  const updatedCourse = req.body.course
  const msg = req.body.msg
  const userId = req.headers['x-user-id']

  if (!validateCourse(updatedCourse)) return res.status(400).json({})
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, updatedCourse, { new: true })
    if (!course) return res.status(404).json({})
  
    // WhatsApp Auto-Msg
    const user = await User.findById(userId)
    if (!user) return res.status(401).json({})
    if (msg) await sendCourseMessage(user.name, msg)
  
      return res.json(course)
  } catch (err) {
    console.error('Fehler beim Aktualisieren:', err)
    return res.status(500).json({})
  }
})

// delete course
router.delete('/:id', checkRole(['superadmin', 'admin']), checkCooldown, async (req, res) => {
  const msg = req.query.msg
  const userId = req.headers['x-user-id']
  
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({})

    // WhatsApp Auto-Msg
    const user = await User.findById(userId)
    if (!user) return res.status(401).json({})
    if (msg) await sendCourseMessage(user.name, msg)


    return res.json({})
  } catch (err) {
    console.error('Fehler beim Löschen:', err)
    return res.status(500).json({})
  }
})

export default router
