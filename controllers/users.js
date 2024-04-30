import bcrypt from 'bcrypt'
import express from 'express'
// import jwt from 'jsonwebtoken'
// import Company from '../models/company.js'
import User from '../models/user.js'
import Shift from '../models/shift.js'

const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
  // console.log(request.user)
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to view users'
    })
  }
  request.user.role === 'admin'
  ? response.json(await User.find().populate({path: 'shifts'}))
  : response.json(await User.find({ company: request.user.company, role: 'employee' }).populate({path: 'shifts'}))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id).populate('shifts', { id:1, start: 1, end: 1, date: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, role, company } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  //https://www.tuomas.salste.net/doc/tunnus/y-tunnus.html#muoto
  const existingCompany = await User.findOne({ company })
  if (existingCompany && role === 'boss') {
    return response.status(400).json({
      error: 'business id must be unique'
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
    company,
    shifts: [],
    messages: [],
    working: false,
    securityLevel: role === 'boss' ? 5 : 1
  })
  try {
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    console.log(error)
  }
  
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