import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  content: String,
  timeSent: Date,
  read: Boolean,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: Number,/* {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }, */
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Message = mongoose.model('Message', messageSchema)

export default Message