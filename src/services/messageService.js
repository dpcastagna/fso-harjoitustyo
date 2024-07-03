import axios from 'axios'
import axiosConfig from '../utils/axiosConfig'

const baseUrl = eval(import.meta.env.VITE_DEV) ? 'http://localhost:5000/api/messages' : '/api/messages'

export const getAll = async () => {
  const response = await axios.get(baseUrl, axiosConfig())
  return response.data
}

export const getMyMessages = async () => {
  const response = await axios.get(baseUrl, axiosConfig())
  return response.data
}

export const createMessage = async (newObj) => {
  const object = { 
    subject: newObj.subject,
    content: newObj.content,
    receiver: newObj.receiver,
    company: newObj.company
  }
  
  try {
    const response = await axios.post(baseUrl, object, axiosConfig())
    return response.data
  } catch (error) {
    console.log(error.message)
    return error
  }
}

export const removeMessage = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, axiosConfig())
    // console.log(response)
    return response.data
  } catch (error) {
    console.log(error.response)
    return error
  }
}

export default { getAll, createMessage, removeMessage, getMyMessages }