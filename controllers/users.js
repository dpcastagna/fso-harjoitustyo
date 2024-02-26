import bcrypt from 'bcrypt'
import express from 'express'
// const Company = require('../models/company')
import User from '../models/user.js'

const usersRouter = express.Router();

usersRouter.post('/', async (request, response) => {
  const { username, name, password, role } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password not entered or it is too short(minimum length 3)'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    role,
    shifts: [],
    company: 2134,
    working: false
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})//.populate('company', { id: 1 })
    response.json(users)
})

export default usersRouter