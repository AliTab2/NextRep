import express from 'express'
import User from '../models/User.js'
import { checkRole } from '../middleware/check.js'
import { validateUser } from '../utils/validate.js'

const router = express.Router()

// GET ALL USERS
router.get('/', checkRole(['superadmin', 'admin']), async (req, res) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (err) {
    console.error('Fehler beim Abrufen:', err)
    return res.status(500).json({})
  }
}) 

// GET ONE USER
router.get('/user', checkRole(['superadmin', 'admin']), async (req, res) => {
  try {
    const targetUserId = req.headers['x-target-user-id']
    const user = await User.findById(targetUserId)
    if (!user) return res.status(404).json({})
    return res.json(user)
  } catch (err) {
    console.error('Fehler beim Abrufen:', err)
    return res.status(500).json({})
  }
}) 

// CREATE USER
router.post('/create', checkRole(['superadmin']), async (req, res) => {
  const user = req.body
  if (!validateUser(user)) return res.status(400).json({})
  try {
    const nameExists = await User.findOne({
      name: { $regex: new RegExp(`^${user.name}$`, 'i') }
    })
    if (nameExists) return res.status(409).json({ message: 'Name bereits vergeben' })
    const newUser = new User(user)
    await newUser.save()
    return res.json({}) 
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
    return res.status(500).json({})
  }
})

// UPDATE USER
router.put('/update', checkRole(['superadmin']), async (req, res) => {
  const updated = req.body
  const targetUserId = req.headers['x-target-user-id']

  if (!validateUser(updated)) {
    return res.status(400).json({})
  }

  try {
    const nameConflict = await User.findOne({
      _id: { $ne: targetUserId }, 
      name: { $regex: new RegExp(`^${updated.name}$`, 'i') } 
    })
    if (nameConflict) return res.status(409).json({ message: 'Name bereits vergeben' })
    const user = await User.findByIdAndUpdate(targetUserId, updated, { new: true })
    if (!user) return res.status(404).json({})
    return res.json(user)
  } catch (err) {
    console.error('Fehler beim Aktualisieren:', err)
    return res.status(500).json({})
  }
})

// DELETE USER
router.delete('/delete', checkRole(['superadmin']), async (req, res) => {
  try {
    const targetUserId = req.headers['x-target-user-id']
    const deleted = await User.findByIdAndDelete(targetUserId)
    if (!deleted) return res.status(404).json({})
    return res.json({})
  } catch (err) {
    console.error('Fehler beim Löschen:', err)
    return res.status(500).json({})
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({})
  try {
    const user = await User.findOne({password})
    if (!user) return res.status(401).json({})

    const { name, roles, courses, history, isBlocked, _id } = user
    res.json({ id: _id, name, roles, courses, history, isBlocked, password: user.password })

  } catch (err) {
    console.error('Fehler beim Login:', err)
    return res.status(500).json({})
  }
})

export default router
