import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import usersRouter from './controllers/users.js'
import shiftsRouter from './controllers/shifts.js'
import messagesRouter from './controllers/messages.js'
import loginRouter from './controllers/login.js'
import { tokenExtractor, userExtractor, requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT || 5000
const DEV = process.env.DEV || false

mongoose.connect(eval(DEV) === true ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
app.use(tokenExtractor)
app.use(userExtractor)

app.get('/version', (req, res) => {
  res.send('11 tag action toimii?') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use('/api/users', usersRouter)
app.use('/api/shifts', shiftsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server started on port 5000')
})
