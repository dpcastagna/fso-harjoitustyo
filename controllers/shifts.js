import bcrypt from 'bcrypt'
import express from 'express'
// import jwt from 'jsonwebtoken'
// import Company from '../models/company.js'
import User from '../models/user.js'
import Shift from '../models/shift.js'

const shiftsRouter = express.Router();

shiftsRouter.get('/', async (request, response) => {
    const shifts = await Shift
      .find({}).populate('user', { id: 1, name: 1 })
    response.json(shifts)
})

shiftsRouter.get('/:id', async (request, response) => {
  const shift = await Shift
    .findById(request.params.id)
  response.json(shift)
})

shiftsRouter.post('/', async (request, response) => {
  const { date, start, end, user, company } = request.body

  // const existingUser = await User.findOne({ username })
  // if (existingUser) {
  //   return response.status(400).json({
  //     error: 'username must be unique'
  //   })
  // }

  // if (password.length < 3) {
  //   return response.status(400).json({
  //     error: 'password not entered or it is too short(minimum length 3)'
  //   })
  // }

  // const saltRounds = 10
  // const passwordHash = await bcrypt.hash(password, saltRounds)

  const shift = new Shift({
    date,
    start,
    end,
    user,
    company: 2134,
  })

  const savedShift = await shift.save()

  const userToUpdate = await User.findById(user)
  
  userToUpdate.shifts = userToUpdate.shifts.concat(savedShift._id)
  
  await userToUpdate.save()

  response.status(201).json(savedShift)
})

shiftsRouter.put('/:id', async (request, response, next) => {
  // const body = request.body
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // console.log(user)
  const shiftToUpdate = await Shift.findById(request.params.id)
  const userToDeleteShift = await User.findById(shiftToUpdate.user)
  const userToAddShift = await User.findById(request.body.id)

  // console.log(shiftToUpdate)
  shiftToUpdate.user = request.body.id
  console.log(userToDeleteShift)

  userToDeleteShift.shifts = userToDeleteShift.shifts.filter(shift => {
    console.log(JSON.stringify(shift._id), request.params.id, typeof JSON.stringify(shift._id), typeof request.params.id, shift._id != request.params.id)
    return shift._id != request.params.id
  })
  userToAddShift.shifts = userToAddShift.shifts.concat(request.params.id)
  console.log(userToDeleteShift, userToAddShift)
  try {
    await shiftToUpdate.save()
    await userToDeleteShift.save()
    await userToAddShift.save()
  } catch (error) {
    console.log(error)
  }


  
  response.json(shiftToUpdate)
})

shiftsRouter.delete('/:id', async (request, response) => {
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const shift = await Shift.findById(request.params.id)
  // console.log('user: ', user)
  if (shift) {
    await Shift.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid shift or token missing/invalid' })
  }
})

export default shiftsRouter