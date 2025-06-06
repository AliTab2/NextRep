import express from 'express'
const router = express.Router()
import History from "../models/History.js"

router.get('/', async (_req, res) => {
  try {
    const history = await History.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name') 

    const transformed = history.map(entry => ({
      _id: entry._id,
      action: entry.action,
      message: entry.message,
      createdAt: entry.createdAt,
      userName: entry.userId?.name || 'Nicht mehr im System',
    }))

    return res.json(transformed)
  } catch (err) {
    console.error('Fehler beim Abrufen der History:', err)
    return res.status(500).json({})
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const history = await History.find({ userId }).sort({ createdAt: -1 }).populate('userId', 'name') 
    const transformed = history.map(entry => ({
      _id: entry._id,
      action: entry.action,
      message: entry.message,
      createdAt: entry.createdAt,
      userName: entry.userId?.name || 'Nicht mehr im System',
    }))
    return res.json(transformed)
  } catch (err) {
    console.error('Fehler beim Abrufen der Nutzer-History:', err)
    return res.status(500).json({})
  }
})

router.post('/', async (req, res) => {
  try {
    const { action, message, userId } = req.body
    if (!message || !userId) return res.status(400).json({})
    await History.create({ action, message, userId })
    return res.status(201).json({})
  } catch (err) {
    console.error('Fehler beim Erstellen des History-Eintrags:', err)
    return res.status(500).json({})
  }
})

export default router
