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

const allowedOrigins = [
  'http://localhost:5173',
  'https://next-rep.app'
]

app.use(cors({
  origin: (origin, callback) => {
    // Wenn kein Origin (z. B. bei Postman) → zulassen
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Nicht erlaubter Origin'), false)
  },
  credentials: true
}))


// API-Routen
app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/history', historyRoutes)

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ Verbunden mit MongoDB')
  app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf Port:${PORT}`)
  })
}).catch((err) => {
  console.error('❌ MongoDB-Verbindung fehlgeschlagen:', err)
})

