// import bcrypt from 'bcrypt'
import express from 'express'
// import jwt from 'jsonwebtoken'
// import Company from '../models/company.js'
import User from '../models/user.js'
import Shift from '../models/shift.js'

const shiftsRouter = express.Router();

shiftsRouter.get('/', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to see shifts'
    })
  }

  const shifts = await Shift
    .find({}).populate('employeeId', { id: 1, name: 1 })
  response.json(shifts)
})

shiftsRouter.get('/:id', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to see messages'
    })
  }

  const shift = await Shift
    .findById(request.params.id)
  response.json(shift)
})

shiftsRouter.post('/', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to create new messages'
    })
  }

  const { date, start, end, employeeId, company } = request.body

  const shift = new Shift({
    date,
    start,
    end,
    employeeId,
    company,
  })

  try {
    const savedShift = await shift.save()
    const userToUpdate = await User.findById(employeeId)
    
    userToUpdate.shifts = userToUpdate.shifts.concat(savedShift._id)
    
    await userToUpdate.save()
  }
  catch(error) {
  }
  response.status(201).json(savedShift)
})

shiftsRouter.put('/:id', async (request, response, next) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to edit messages'
    })
  }
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
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to delete messages'
    })
  }
  
  const shift = await Shift.findById(request.params.id)
  
  if (shift) {
    await Shift.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid shift or token missing/invalid' })
  }
})

export default shiftsRouter