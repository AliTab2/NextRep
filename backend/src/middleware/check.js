import User from '../models/User.js'

export function checkRole(allowedRoles = []) {
  return async function (req, res, next) {
    const userId = req.headers['x-user-id']

    if (!userId) {
      return res.status(401).json({})
    }

    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({})
      }

      const hasRole = user.roles.some(role => allowedRoles.includes(role))
      if (!hasRole) {
        return res.status(403).json({})
      }

      next()
    } catch (err) {
      console.error('Fehler bei Rollenprüfung:', err)
      res.status(500).json({ message: 'Interner Serverfehler' })
    }
  }
}

let lastActionTime = 0
const COOLDOWN_MS = 30000 

export function checkCooldown(req, res, next) {
  const now = Date.now()

  if (now - lastActionTime < COOLDOWN_MS) {
    const waitTime = Math.ceil((COOLDOWN_MS - (now - lastActionTime)) / 1000)
    return res.status(429).json({
      message: `Bitte warte noch ${waitTime} Sekunden.`,
    })
  }

  lastActionTime = now
  next()
}


