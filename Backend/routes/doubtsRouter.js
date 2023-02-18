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

// router.get('/getUnresolved', getUnresolved)
// router.get('/getDoubt/:post_id', getDoubt)
// router.get('/home', home)
// router.post('/addDoubt', addDoubt)
// router.post('/addComment', addComment)
// router.post('/answerDoubt', answerDoubt)

router.get('/getUnresolved', requireAuth, getUnresolved)
router.get('/getDoubt/:post_id', adminAuth, getDoubt)
router.get('/getDoubts', home)
router.post('/addDoubt', requireAuth, addDoubt)
router.post('/addComment', requireAuth, addComment)
router.post('/answerDoubt', adminAuth, answerDoubt)

module.exports = router
