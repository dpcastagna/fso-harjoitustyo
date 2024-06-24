export const userCheck = (request, response, message) => {
  if(!request.user) {
    console.log('jee')
    return response.status(400).json({
      error: message
    })
  }
  return true
}