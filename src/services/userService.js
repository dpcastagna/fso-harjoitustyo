// import axios from 'axios'

// const baseUrl = 'http://localhost:5000/api/users'
import users from "../mock/users"

export const getAll = () => {
  return users
  // const response = await axios.get(baseUrl)
  // return response.data
}

// const createNew = async (content) => {
//   const object = { content, votes: 0 }
//   const response = await axios.post(baseUrl, object)
//   console.log(response.data)
//   return response.data
// }



export default getAll