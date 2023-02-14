const express = require('express')
const {
  createUser,
  loginUser,
  checkUser,
  logoutUser,
} = require('../controllers/userController')

const router = express.Router()

router.get('/', checkUser)
router.post('/signup', createUser)
router.post('/signin', loginUser)
router.get('/logout', logoutUser)

module.exports = router
