import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
  },
  name: String,
  passwordHash: String,
  role: String,
  shifts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shift'
    }
  ],
  company: Number,/* {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }, */
  securityLevel: Number,
  working: Boolean,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export default User