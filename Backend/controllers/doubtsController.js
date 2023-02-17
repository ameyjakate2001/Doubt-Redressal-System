const User = require('../models/users')
const Doubt = require('../models/doubts')

const handleErrors = (err) => {
  console.log(err)
  let errors = { title: '', description: '' }
  if (err.message.includes('doubt validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const home = async (req, res) => {
  const doubts = await Doubt.find()
    .populate({
      path: 'user_id',
    })
    .populate({
      path: 'comments.user_id',
    })
  res.send(doubts)
}
const addDoubt = async (req, res) => {
  const { title, description } = req.body
  try {
    const doubt = new Doubt({
      title,
      description,
      user_id: req.user.id,
    })
    await doubt.save()
    console.log('doubt saved')
    res.json({ doubt })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const addComment = async (req, res) => {
  const { doubt_id, text } = req.body
  const doubt = await Doubt.findById(doubt_id)
  doubt.comments.push({
    user_id: req.user.id,
    text,
  })
  await doubt.save()
  res.send(doubt)
}
const getUnresolved = async (req, res) => {
  const unresolved = await Doubt.find({ resolved: 0 })
    .populate({
      path: 'user_id',
    })
    .populate({
      path: 'comments.user_id',
    })
  res.send(unresolved)
}
const getDoubt = async (req, res) => {
  const { post_id } = req.params
  const doubts = await Doubt.findById(post_id)
  res.send(doubts)
}
const answerDoubt = async (req, res) => {
  const { answer, doubt_id } = req.body
  const post = await Doubt.findById(doubt_id)
  post.answer = answer
  post.resolved = 1
  await post.save()
  console.log('answer added')
  res.send(post)
}
module.exports = {
  getUnresolved,
  addDoubt,
  addComment,
  home,
  getDoubt,
  answerDoubt,
}
