const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
  },
})

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: 'User',
  },
  resolved: {
    type: Number,
    default: 0,
  },
  answer: {
    type: String,
  },
  answer_id: {
    type: ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
})

const Doubt = mongoose.model('doubt', doubtSchema)

module.exports = Doubt
