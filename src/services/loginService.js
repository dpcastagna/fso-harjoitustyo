import axios from 'axios'
const baseUrl = eval(import.meta.env.VITE_DEV) ? 'http://localhost:5000/api/login' : '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }