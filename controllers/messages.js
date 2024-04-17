// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/user.js'
import Message from '../models/message.js'

const messagesRouter = express.Router();

messagesRouter.get('/', async (request, response) => {
    const messages = await Message
      .find({}).populate('sender', { id: 1, username: 1 }).populate('receiver', { id: 1, username: 1 })
    response.json(messages)
})

messagesRouter.get('/:id', async (request, response) => {
  const message = await Message
    .findById(request.params.id)
  response.json(message)
})

messagesRouter.post('/', async (request, response) => {
  const { subject, content, sender, receiver, company } = request.body

  const message = new Message({
    subject,
    content,
    timeSent: new Date(),
    read: false,
    sender,
    receiver,
    company,
  })

  const savedMessage = await message.save()

  const senderToUpdate = await User.findById(sender)
  const receiverToUpdate = await User.findById(receiver)
  
  senderToUpdate.messages = senderToUpdate.messages.concat(savedMessage._id)
  receiverToUpdate.messages = receiverToUpdate.messages.concat(savedMessage._id)
  
  await senderToUpdate.save()
  await receiverToUpdate.save()

  response.status(201).json(savedMessage)
})

messagesRouter.put('/:id', async (request, response, next) => {
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

messagesRouter.delete('/:id', async (request, response) => {
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const message = await Message.findById(request.params.id)
  // console.log('user: ', user)
  if (message) {
    await Message.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid message or token missing/invalid' })
  }
})

export default messagesRouter