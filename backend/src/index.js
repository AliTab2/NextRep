import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import courseRoutes from './routes/courseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // oder '*', wenn du es offen lassen willst
  credentials: false,
}))

// API-Routen
app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/history', historyRoutes)

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ Verbunden mit MongoDB')
  app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('❌ MongoDB-Verbindung fehlgeschlagen:', err)
})

