const User = require('../models/users')
const Doubt = require('../models/doubts')

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

  const doubt = new Doubt({
    title,
    description,
    user_id: req.user.id,
  })
  await doubt.save()
  console.log('doubt saved')
  res.json({ doubt })
}

const addComment = async (req, res) => {
  const { doubt_id, text } = req.body
  const doubt = await Doubt.findById(doubt_id)
  doubt.comments.push({
    user_id: req.user.id,
    text,
  })
  await doubt.save()
  console.log(doubt)
  res.send(doubt)
}
const getUnresolved = async (req, res) => {
  const unresolved = await Doubt.find({ resolved: 0 })
  res.send(unresolved)
}
const getDoubt = async (req, res) => {
  const { post_id } = req.params
  const doubts = await Doubt.findById(post_id)
  res.send(doubts)
}
const answerDoubt = async (req, res) => {
  const { answer, post_id } = req.body
  const post = await Doubt.findById(post_id)
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