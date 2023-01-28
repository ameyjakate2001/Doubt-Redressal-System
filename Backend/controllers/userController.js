const User = require('../models/users.js')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  let errors = { name: '', email: '', password: '' }
  if (err.message === 'Email not Registered')
    errors.email = 'Email not Registered'
  if (err.message === 'Password incorrect')
    errors.password = 'Password incorrect'

  if (err.code === 11000) {
    errors.email = 'that email is already registered'
    return errors
  }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}
const maxAge = 3 * 24 * 60 * 60
const createWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

const createUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({ name, email, password })
    const token = createWebToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res
      .status(201)
      .json({ userId: user._id, name: user.name, email: user.email })
  } catch (e) {
    const errors = handleErrors(e)
    res.status(400).json({ errors })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createWebToken(user._id)
    console.log(token)
    res.status(201).json({ user: user._id, token, msg: 'user logged in' })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports = { createUser, loginUser }
