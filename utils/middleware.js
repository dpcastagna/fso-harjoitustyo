// const logger = require('./logger')
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// const requestLogger = (request, response, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:  ', request.path)
//   logger.info('Body:  ', request.body)
//   logger.info('---')
//   next()
// }

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if ( authorization && authorization.toLowerCase().startsWith('bearer ') ) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

// const tokenExtractor = (req, res, next) => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     try {
//       // console.log(authorization.substring(7))
//       req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
//     } catch (error){
//       console.log(error)
//       return res.status(401).json({ error: 'token invalid' })
//     }
//   } else {
//     return res.status(401).json({ error: 'token missing' })
//   }
//   next()
// }

export const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if ( authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // console.log('auth:', authorization.substring(7))
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id)
    user.passwordHash = ''
    request.user = user
  } else {
    request.user = null
  }

  next()
}

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

// module.exports = {
//   requestLogger,
//   tokenExtractor,
//   userExtractor,
//   unknownEndpoint,
//   errorHandler
// }