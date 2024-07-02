import axios from 'axios'
import axiosConfig from '../utils/axiosConfig'

const baseUrl = eval(import.meta.env.VITE_DEV) ? 'http://localhost:5000/api/users' : '/api/users'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const getMyEmployees = async (companyId) => {
  // const token = `Bearer ${JSON.parse(localStorage.loggedInUser).token}`
  // // console.log(JSON.parse(localStorage.loggedInUser).token)
  // // console.log(token)

  // const config = {
  //   headers: { Authorization: token },
  // }

  const response = await axios.get(baseUrl, axiosConfig())//.filter(employee => employee.role === 'employee' && employee.company === companyId)
  
  return response.data
}

export const createNew = async (newObj) => {
  const object = { 
    name: newObj.name,
    username: newObj.username,
    password: newObj.password,
    role: newObj.role,
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

export const removeOld = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, axiosConfig())
    return response.data
  } catch (error) {
    console.log(error.message)
    return error
  }
}

export default { getAll, createNew, getMyEmployees, removeOld }