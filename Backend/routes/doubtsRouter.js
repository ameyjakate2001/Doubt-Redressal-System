const express = require('express')
const { requireAuth, adminAuth } = require('../middleware/authMiddleware')
const {
  getUnresolved,
  addDoubt,
  addComment,
  home,
  getDoubt,
  answerDoubt,
} = require('../controllers/doubtsController')

const router = express.Router()

router.get('/getUnresolved', adminAuth, getUnresolved)
router.get('/getDoubt/:post_id', adminAuth, getDoubt)
router.get('/home', requireAuth, home)
router.post('/addDoubt', requireAuth, addDoubt)
router.post('/addComment', requireAuth, addComment)
router.post('/answerDoubt', adminAuth, answerDoubt)

module.exports = router
