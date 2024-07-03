import express from 'express'
import User from '../models/user.js'
import Message from '../models/message.js'
import { userCheck } from '../utils/helperFunctions.js';

const messagesRouter = express.Router();

messagesRouter.get('/', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to see messages'
    })
  }
  // await userCheck(request, response, 'must be logged in to see messages')

  try {
    const messages = (await Message
      .find({ 
        $and: [
          { company: { $eq: request.user.company } },
          { $or: [
            { sender: request.user._id },
            { receiver: request.user._id }
          ]
          },
        ]
      })
      .populate('sender', { id: 1, /* username: 1, */ name: 1 })
      .populate('receiver', { id: 1, /* username: 1, */ name: 1 })
    )
    // .filter(message => message.sender !== null && message.receiver !== null)
    // console.log(messages)
    
    response.json(messages)
  } catch(error) {
    console.log(error)
  }
})

messagesRouter.get('/:id', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to see messages'
    })
  }

  const message = await Message
    .findById(request.params.id)
  response.json(message)
})

messagesRouter.post('/', async (request, response) => {
  if(!request.user) {
    return response.status(400).json({
      error: 'must be logged in to send a message'
    })
  }

  const { subject, content, receiver, company } = request.body

  const findReceiver = request.user.role === 'employee'
    ? (await User.find({$and: [ { company: { $eq: request.user.company } }, { role: { $eq: 'boss' } } ]}))[0]._id
    : receiver

  const message = new Message({
    subject,
    content,
    timeSent: new Date(),
    read: false,
    sender: request.user._id,
    receiver: findReceiver,
    company,
  })
  
  const savedMessage = await message.save()

  const senderToUpdate = await User.findById(request.user._id)
  const receiverToUpdate = await User.findById(findReceiver)
  
  senderToUpdate.messages = senderToUpdate.messages.concat(savedMessage._id)
  receiverToUpdate.messages = receiverToUpdate.messages.concat(savedMessage._id)
  
  await senderToUpdate.save()
  await receiverToUpdate.save()

  response.status(201).json(savedMessage)
})

messagesRouter.put('/:id', async (request, response) => {
  const messageToUpdate = await Message.findById(request.params.id)
  // const userToUpdateMessage = await User.findById(messageToUpdate.user)
  // const userToAddMessage = await User.findById(request.body.id)

  // console.log(shiftToUpdate)
  messageToUpdate.content = request.body.content
  // console.log(userToUpdateMessage)

  // userToUpdateMessage.messages = userToDeleteShift.shifts.filter(shift => {
  //   console.log(JSON.stringify(shift._id), request.params.id, typeof JSON.stringify(shift._id), typeof request.params.id, shift._id != request.params.id)
  //   return shift._id != request.params.id
  // })
  // userToAddShift.shifts = userToAddShift.shifts.concat(request.params.id)
  // console.log(userToDeleteShift, userToAddShift)
  try {
    await messageToUpdate.save()
    // await userToDeleteShift.save()
    // await userToAddShift.save()
  } catch (error) {
    console.log(error)
  }

  response.json(shiftToUpdate)
})

messagesRouter.delete('/:id', async (request, response) => {
  if(!request.user) {
    response.status(400).json({
      error: 'must be logged in to delete messages'
    })
  }

  if(request.user.role !== 'boss') {
    return response.status(401).json({
      error: 'employees can\'t delete messages'
    })
  }
  
  const message = await Message.findById(request.params.id)

  if (message) {
    try {
      const senderToDeleteMessageFrom = await User.findById(message.sender)
      const receiverToDeleteMessageFrom = await User.findById(message.receiver)
      // console.log(senderToDeleteMessageFrom, receiverToDeleteMessageFrom)
    
      senderToDeleteMessageFrom.messages = senderToDeleteMessageFrom.messages.filter(message => message._id != request.params.id)
      receiverToDeleteMessageFrom.messages = receiverToDeleteMessageFrom.messages.filter(message => message._id != request.params.id)
    // } catch(error) {
    //   console.log(error)
    // }
    // try {
      await Message.findByIdAndDelete(request.params.id)
      await senderToDeleteMessageFrom.save()
      await receiverToDeleteMessageFrom.save()

      response.status(204).end()
    } catch(error) {
      console.log(error)
    }
  } else {
    response.status(401).json({
      error: 'invalid message or token missing/invalid'
    })
  }
})

export default messagesRouter