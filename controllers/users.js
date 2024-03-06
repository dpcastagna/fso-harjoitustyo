import bcrypt from 'bcrypt'
import express from 'express'
// import jwt from 'jsonwebtoken'
// import Company from '../models/company.js'
import User from '../models/user.js'
import Shift from '../models/shift.js'

const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
    const users = await User.find().populate({path: 'shifts'/* , { id: 1, date: 1, start: 1, end: 1 } */})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id).populate('shifts', { id:1, start: 1, end: 1, date: 1 })
  response.json(user)
})

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

usersRouter.put('/:id', async (request, response, next) => {
  // const body = request.body
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // console.log(user)
  const userToUpdate = await User.findById(request.params.id)
  const user = { ...userToUpdate, working: !userToUpdate.working }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  
  response.json(updatedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(request.params.id)
  // console.log('user: ', user)
  if (user) {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid user or token missing/invalid' })
  }
})

export default usersRouter