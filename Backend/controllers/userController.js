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
  if (err.message.includes('User validation failed')) {
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
    let user = await User.create({ name, email, password })
    user.password = undefined
    const token = createWebToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json(user)
  } catch (e) {
    const errors = handleErrors(e)
    res.status(400).json({ errors })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.login(email, password)
    user.password = undefined
    const token = createWebToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(201).json(user)
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const checkUser = async (req, res) => {
  const token = req.cookies.jwt
  let user = null
  let decodedToken
  if (!token) {
    return res.status(200).json(user)
  }
  if (token && token !== 'undefined') {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
      if (err) {
        console.log(err.message)
        // res.send(err.message)
      } else {
        decodedToken = verifiedJwt
        // res.send(verifiedJwt)
      }
    })
  }
  try {
    user = await User.findById(decodedToken.id)
    if (user) user.password = undefined
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json(user)
  }
  // }
}
const logoutUser = async (req, res) => {
  res.cookie('jwt', 'cookieExpired', { httpOnly: true, maxAge: 1000 })
  res.json({ success: true, message: 'user successfully logged out' })
}
module.exports = { createUser, loginUser, checkUser, logoutUser }
