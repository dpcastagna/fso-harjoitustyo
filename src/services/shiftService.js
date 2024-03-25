import axios from 'axios'
const baseUrl = eval(import.meta.env.VITE_DEV) ? 'http://localhost:5000/api/shifts' : '/api/shifts'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const getMyCompanyShifts = async (companyId) => {
  const response = (await axios.get(baseUrl)).data.filter(shift => shift.company === companyId)
  
  return response
}

export const createNewShift = async (newObj) => {
  const object = { 
    date: newObj.date,
    start: newObj.start,
    end: newObj.end,
    employeeId: newObj.employeeId,
    company: newObj.company
  }
  try {
    const response = await axios.post(baseUrl, object)
    return response.data
  } catch (error) {
    console.log(error.message)
    return error
  }
}

export const removeOldShift = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    
    return response.data
  } catch (error) {
    console.log(error.message)
    return error
  }
}

export default { getAll, createNewShift, getMyCompanyShifts, removeOldShift }