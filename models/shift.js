import mongoose from 'mongoose'

const shiftSchema = mongoose.Schema({
  startDate: {
    type: Date,
    min: '2024-01-01',
    max: '2100-01-01'
  },
  // startTime: String,
  endDate: {
    type: Date,
    min: '2024-01-01',
    max: '2100-01-01'
  },
  // endTime: String,
  employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  company: Number,/* {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }, */
})

shiftSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Shift = mongoose.model('Shift', shiftSchema)

export default Shift