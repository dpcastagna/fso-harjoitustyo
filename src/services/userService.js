import axios from 'axios'
const baseUrl = eval(import.meta.env.VITE_DEV) ? 'http://localhost:5000/api/users' : '/api/users'

export const getAll = async () => {
  // return users
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (newObj) => {
  const object = { 
    name: newObj.name,
    username: newObj.username,
    password: newObj.password,
    role: newObj.role
  }
  const response = await axios.post(baseUrl, object)
  console.log(response.data)
  return response.data
}



export default { getAll, createNew }