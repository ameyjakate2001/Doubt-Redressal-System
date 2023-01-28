const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).json({ msg: 'not authorized' })
      } else {
        req.user = user
        next()
      }
    })
  } else {
    res.status(401).json({ msg: 'not authorized' })
  }
}
const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.status(401).json({ msg: 'not authorized' })
      } else {
        const userRole = await User.findById(user.id)
        if (userRole.role != 1) {
          res.status(401).json({ msg: 'not authorized' })
        } else {
          req.user = user
          next()
        }
      }
    })
  } else {
    res.status(401).json({ msg: 'not authorized' })
  }
}

module.exports = { requireAuth, adminAuth }
