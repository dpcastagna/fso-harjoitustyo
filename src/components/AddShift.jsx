import { useState, useEffect } from "react"
import '../App.css'
import { createNewShift } from "../services/shiftService"

const AddShift = (props) => {
  const [newDate, setNewDate] = useState('')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')
  const [newShiftFor, setNewShiftFor] = useState('')
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])

  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleStartChange = (event) => {
    setNewStart(event.target.value)
  }
  const handleEndChange = (event) => {
    setNewEnd(event.target.value)
  }
  const handleShiftChange = (event) => {
    setNewShiftFor(event.target.value)
  }

  const addShift = async (event) => {
    event.preventDefault()
    const shiftObject = {
      date: newDate,
      start: newStart,
      end: newEnd,
      company: props.company,
      employeeId: newShiftFor,
    }
    
    const newShift = await createNewShift(shiftObject)
    props.addShift(newShift)

    setNewDate('')
    setNewStart('')
    setNewEnd('')
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={addShift}>
        New shift<br/>
        date:
          <input
            id='date'
            type='date'
            value={newDate}
            onChange={handleDateChange}
            placeholder='blog title'
          /> <br/>
        start:
          <input
            id='start'
            type='number'
            value={newStart}
            onChange={handleStartChange}
            placeholder='8'
            min='0'
            max='23'
          /> <br/>
        end:
          <input
            id='end'
            type='number'
            value={newEnd}
            onChange={handleEndChange}
            placeholder='16'
            min='0'
            max='23'
          /> <br/>
        employee:
          <select onChange={handleShiftChange}>
            <option>Select...</option>
            {
              employeeList.map(employee => {
                
                return (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                )
              }
              )
            }
          </select> <br/>
        <button id='createShift' type="submit">add shift</button>
      </form>
    </div>
  )
}

export default AddShift